import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { MMKVStorage } from './storage';

const supabaseUrl = process.env.EXPO_PUBLIC_PROJECT_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_ANON_KEY;

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string, {
  auth: {
    storage: MMKVStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    }
  }
});

// Real-time subscription manager
export class RealtimeManager {
  private static instance: RealtimeManager;
  private channels: Map<string, any> = new Map();

  static getInstance(): RealtimeManager {
    if (!RealtimeManager.instance) {
      RealtimeManager.instance = new RealtimeManager();
    }
    return RealtimeManager.instance;
  }

  // Subscribe to new messages in a chat room
  subscribeToMessages(chatRoomId: string, callback: (payload: any) => void) {
    const channelKey = `messages:${chatRoomId}`;
    
    // Remove existing subscription if any
    if (this.channels.has(channelKey)) {
      this.unsubscribe(channelKey);
    }

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_room_id=eq.${chatRoomId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(channelKey, channel);
    return channel;
  }

  // Subscribe to chat room updates (last message, etc.)
  subscribeToChatRooms(userId: string, callback: (payload: any) => void) {
    const channelKey = `chatrooms:${userId}`;
    
    if (this.channels.has(channelKey)) {
      this.unsubscribe(channelKey);
    }

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_rooms',
        },
        callback
      )
      .subscribe();

    this.channels.set(channelKey, channel);
    return channel;
  }

  // Subscribe to chat room members (for group updates)
  subscribeToChatMembers(chatRoomId: string, callback: (payload: any) => void) {
    const channelKey = `members:${chatRoomId}`;
    
    if (this.channels.has(channelKey)) {
      this.unsubscribe(channelKey);
    }

    const channel = supabase
      .channel(channelKey)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_room_members',
          filter: `chat_room_id=eq.${chatRoomId}`,
        },
        callback
      )
      .subscribe();

    this.channels.set(channelKey, channel);
    return channel;
  }

  unsubscribe(channelKey: string) {
    const channel = this.channels.get(channelKey);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelKey);
    }
  }

  unsubscribeAll() {
    this.channels.forEach((channel, key) => {
      supabase.removeChannel(channel);
    });
    this.channels.clear();
  }
}