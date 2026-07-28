import type { SyncPayload } from '../types/game';

const CHANNEL_NAME = 'sdg_arcade_quiz_channel';
const LOCAL_STORAGE_KEY = 'sdg_arcade_quiz_event';

class SyncService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(payload: SyncPayload) => void> = new Set();
  public clientId: string;

  constructor() {
    this.clientId = 'client_' + Math.random().toString(36).substring(2, 9);
    
    // Initialize BroadcastChannel if supported
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(CHANNEL_NAME);
        this.channel.onmessage = (event: MessageEvent<SyncPayload>) => {
          if (event.data) {
            this.notifyListeners(event.data);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel initialization failed, falling back to localStorage', e);
      }
    }

    // Fallback/Supplementary localStorage listener
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event: StorageEvent) => {
        if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
          try {
            const payload: SyncPayload = JSON.parse(event.newValue);
            this.notifyListeners(payload);
          } catch (err) {
            console.error('Failed to parse sync payload from localStorage', err);
          }
        }
      });
    }
  }

  public publish(payload: Omit<SyncPayload, 'timestamp' | 'senderId'>): void {
    const fullPayload: SyncPayload = {
      ...payload,
      timestamp: Date.now(),
      senderId: this.clientId
    };

    // 1. Send via BroadcastChannel
    if (this.channel) {
      try {
        this.channel.postMessage(fullPayload);
      } catch (e) {
        console.error('Error posting to BroadcastChannel', e);
      }
    }

    // 2. Fallback / Cross-origin trigger via localStorage
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
    this.listeners.clear();
  }
}

export const syncService = new SyncService();
