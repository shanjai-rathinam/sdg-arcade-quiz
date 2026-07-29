import Peer, { type DataConnection } from 'peerjs';
import type { SyncPayload } from '../types/game';

const CHANNEL_NAME = 'sdg_arcade_quiz_channel';
const LOCAL_STORAGE_KEY = 'sdg_arcade_quiz_event';
const HOST_PEER_ID = 'sdg_arcade_quiz_host_v2';

class SyncService {
  private channel: BroadcastChannel | null = null;
  private peer: Peer | null = null;
  private connections: Map<string, DataConnection> = new Map();
  private hostConn: DataConnection | null = null;
  private listeners: Set<(payload: SyncPayload) => void> = new Set();
  public clientId: string;
  public isHost: boolean = false;

  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    this.initBroadcastChannel();
    this.initLocalStorage();
  }

  private initBroadcastChannel() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event: MessageEvent<SyncPayload>) => {
          if (event.data && event.data.senderId !== this.clientId) {
            this.notifyListeners(event.data);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel initialization failed', e);
      }
    }
  }

  private initLocalStorage() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event: StorageEvent) => {
        if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
          try {
            const payload: SyncPayload = JSON.parse(event.newValue);
            if (payload.senderId !== this.clientId) {
              this.notifyListeners(payload);
            }
          } catch (err) {
            console.error('Failed to parse sync payload from localStorage', err);
          }
        }
      });
    }
  }

  public initCrossDevice(isHostView: boolean) {
    this.isHost = isHostView;
    if (typeof window === 'undefined') return;

    try {
      if (isHostView) {
        // Register Host Controller Peer
        this.peer = new Peer(HOST_PEER_ID, { debug: 1 });

        this.peer.on('open', (id) => {
          console.log('[SyncService] Host peer registered cleanly:', id);
        });

        this.peer.on('connection', (conn) => {
          console.log('[SyncService] Player device connected:', conn.peer);
          this.connections.set(conn.peer, conn);

          conn.on('data', (data) => {
            this.handleIncomingData(data);
          });

          conn.on('close', () => {
            this.connections.delete(conn.peer);
          });

          // Send immediate sync confirmation
          conn.send({ event: 'PLAYER_READY', senderId: this.clientId, timestamp: Date.now() });
        });

        this.peer.on('error', (err) => {
          console.warn('[SyncService] Host peer notice:', err.type);
        });
      } else {
        // Register Player Peer & Connect to Host Controller
        this.peer = new Peer({ debug: 1 });

        this.peer.on('open', (id) => {
          console.log('[SyncService] Player peer opened:', id);
          this.connectToHost();
        });

        this.peer.on('error', (err) => {
          console.warn('[SyncService] Player peer notice:', err.type);
        });
      }
    } catch (e) {
      console.warn('[SyncService] Cross-device PeerJS init error:', e);
    }
  }

  public connectToHost() {
    if (!this.peer || (this.hostConn && this.hostConn.open)) return;

    try {
      const conn = this.peer.connect(HOST_PEER_ID, { reliable: true });
      this.hostConn = conn;

      conn.on('open', () => {
        console.log('[SyncService] Connected to Host Controller peer successfully!');
      });

      conn.on('data', (data) => {
        this.handleIncomingData(data);
      });

      conn.on('close', () => {
        this.hostConn = null;
        // Retry connection automatically
        setTimeout(() => this.connectToHost(), 2000);
      });

      conn.on('error', (err) => {
        console.warn('[SyncService] Connection to host error:', err);
      });
    } catch (e) {
      console.warn('[SyncService] Connect to host failed:', e);
    }
  }

  private handleIncomingData(data: unknown) {
    try {
      const payload: SyncPayload = typeof data === 'string' ? JSON.parse(data) : (data as SyncPayload);
      if (payload && payload.event && payload.senderId !== this.clientId) {
        this.notifyListeners(payload);
      }
    } catch (e) {
      console.error('Failed to parse incoming sync data', e);
    }
  }

  public publish(payload: Omit<SyncPayload, 'timestamp' | 'senderId'>): void {
    const fullPayload: SyncPayload = {
      ...payload,
      timestamp: Date.now(),
      senderId: this.clientId
    };

    // 1. BroadcastChannel (Same Device / Local Tabs)
    if (this.channel) {
      try {
        this.channel.postMessage(fullPayload);
      } catch (e) {
        console.error('Error posting to BroadcastChannel', e);
      }
    }

    // 2. PeerJS WebRTC P2P DataChannel (Cross-Device over Internet/WiFi)
    if (this.isHost) {
      // Send to all connected players
      this.connections.forEach((conn) => {
        if (conn.open) {
          try {
            conn.send(fullPayload);
          } catch (e) {
            console.error('Error sending to player peer', e);
          }
        }
      });
    } else if (this.hostConn && this.hostConn.open) {
      // Send from player to host controller
      try {
        this.hostConn.send(fullPayload);
      } catch (e) {
        console.error('Error sending to host peer', e);
      }
    }

    // 3. LocalStorage Fallback
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullPayload));
    } catch (e) {
      console.error('Error writing to localStorage for sync', e);
    }
  }

  public subscribe(callback: (payload: SyncPayload) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(payload: SyncPayload): void {
    this.listeners.forEach(cb => {
      try {
        cb(payload);
      } catch (e) {
        console.error('Error in sync listener callback', e);
      }
    });
  }

  public close(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.connections.clear();
    this.hostConn = null;
    this.listeners.clear();
  }
}

export const syncService = new SyncService();
