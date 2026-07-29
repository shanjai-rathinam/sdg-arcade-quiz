import type { SyncPayload } from '../types/game';

const CHANNEL_NAME = 'sdg_arcade_quiz_channel';
const LOCAL_STORAGE_KEY = 'sdg_arcade_quiz_event';

// Public WebSocket Relays for cross-device internet synchronization
const PRIMARY_WS_URL = 'wss://socketsbay.com/wss/v2/1/sdg_arcade_quiz_live_channel/';

class SyncService {
  private channel: BroadcastChannel | null = null;
  private socket: WebSocket | null = null;
  private listeners: Set<(payload: SyncPayload) => void> = new Set();
  public clientId: string;

  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    this.initBroadcastChannel();
    this.initWebSocket();

    // Fallback/Supplementary localStorage listener (same device)
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

  private initWebSocket() {
    if (typeof window === 'undefined') return;

    try {
      this.socket = new WebSocket(PRIMARY_WS_URL);

      this.socket.onopen = () => {
        console.log('[SyncService] Cross-device WebSocket connected successfully!');
      };

      this.socket.onmessage = (event: MessageEvent) => {
        try {
          if (typeof event.data === 'string') {
            const payload: SyncPayload = JSON.parse(event.data);
            if (payload && payload.event && payload.senderId !== this.clientId) {
              this.notifyListeners(payload);
            }
          }
        } catch (err) {
          // ignore non-JSON messages
        }
      };

      this.socket.onerror = (err) => {
        console.warn('[SyncService] WebSocket error', err);
      };

      this.socket.onclose = () => {
        // Auto-reconnect after 3 seconds if disconnected
        setTimeout(() => this.initWebSocket(), 3000);
      };
    } catch (e) {
      console.warn('[SyncService] WebSocket connection failed', e);
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

    // 2. Real-Time WebSocket (Cross-Device over WiFi / Cellular Internet)
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify(fullPayload));
      } catch (e) {
        console.error('Error posting to WebSocket', e);
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
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.listeners.clear();
  }
}

export const syncService = new SyncService();
