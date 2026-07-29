import Peer, { type DataConnection } from 'peerjs';
import type { SyncPayload } from '../types/game';

const LOCAL_STORAGE_KEY = 'sdg_arcade_quiz_event';

class SyncService {
  private channel: BroadcastChannel | null = null;
  private peer: Peer | null = null;
  private connections: Map<string, DataConnection> = new Map();
  private hostConn: DataConnection | null = null;
  private listeners: Set<(payload: SyncPayload) => void> = new Set();
  
  public clientId: string;
  public roomCode: string = 'SDG-1738';
  public isHost: boolean = false;
  public isConnected: boolean = false;

  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    this.initLocalStorage();
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

  public initRoom(roomCode: string, isHostView: boolean) {
    this.roomCode = roomCode.toUpperCase().trim();
    this.isHost = isHostView;

    const channelName = `sdg_arcade_channel_${this.roomCode}`;
    const hostPeerId = `sdg_arcade_host_${this.roomCode}`;

    // 1. Initialize BroadcastChannel for same-device local tabs
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      if (this.channel) {
        try { this.channel.close(); } catch(e) {}
      }
      try {
        this.channel = new BroadcastChannel(channelName);
        this.channel.onmessage = (event: MessageEvent<SyncPayload>) => {
          if (event.data && event.data.senderId !== this.clientId) {
            this.notifyListeners(event.data);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel initialization failed', e);
      }
    }

    // 2. Initialize PeerJS WebRTC P2P Cloud Connection
    if (typeof window === 'undefined') return;

    // Clean up previous peer connection if room changed
    if (this.peer) {
      try { this.peer.destroy(); } catch(e) {}
      this.peer = null;
    }

    try {
      if (isHostView) {
        // Register Host Controller Peer for this Room Code
        this.peer = new Peer(hostPeerId, { debug: 1 });

        this.peer.on('open', (id) => {
          console.log(`[SyncService] Host Room Controller registered cleanly: ${id}`);
          this.isConnected = true;
        });

        this.peer.on('connection', (conn) => {
          console.log('[SyncService] Remote Player connected to room:', conn.peer);
          this.connections.set(conn.peer, conn);
          this.isConnected = true;

          conn.on('data', (data) => {
            this.handleIncomingData(data);
          });

          conn.on('close', () => {
            this.connections.delete(conn.peer);
          });

          // Send immediate room handshake event to confirm connection
          conn.send({ event: 'PLAYER_READY', senderId: this.clientId, timestamp: Date.now() });
        });

        this.peer.on('error', (err) => {
          console.warn('[SyncService] Host peer room notice:', err.type, err.message);
        });
      } else {
        // Register Player Client Peer & Connect to Host Room Peer
        this.peer = new Peer({ debug: 1 });

        this.peer.on('open', (id) => {
          console.log(`[SyncService] Player peer created (${id}), joining room ${this.roomCode}...`);
          this.connectToHostRoom(hostPeerId);
        });

        this.peer.on('error', (err) => {
          console.warn('[SyncService] Player peer notice:', err.type, err.message);
        });
      }
    } catch (e) {
      console.warn('[SyncService] PeerJS room init error:', e);
    }
  }

  private connectToHostRoom(hostPeerId: string) {
    if (!this.peer || (this.hostConn && this.hostConn.open)) return;

    try {
      const conn = this.peer.connect(hostPeerId, { reliable: true });
      this.hostConn = conn;

      conn.on('open', () => {
        console.log(`[SyncService] Successfully connected to Host Room (${hostPeerId})!`);
        this.isConnected = true;
        
        // Notify host that player has joined room
        conn.send({ event: 'PLAYER_READY', senderId: this.clientId, timestamp: Date.now() });
      });

      conn.on('data', (data) => {
        this.handleIncomingData(data);
      });

      conn.on('close', () => {
        this.hostConn = null;
        this.isConnected = false;
        // Retry connection to host
        setTimeout(() => this.connectToHostRoom(hostPeerId), 2000);
      });

      conn.on('error', (err) => {
        console.warn('[SyncService] Room connection error:', err);
      });
    } catch (e) {
      console.warn('[SyncService] Failed to connect to host room:', e);
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

    // 2. WebRTC P2P DataChannel across Internet/WiFi
    if (this.isHost) {
      // Broadcast to all connected remote player peers
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
      // Send from player client to host controller
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
