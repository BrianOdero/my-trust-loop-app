import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Bot,
  Users,
} from 'lucide-react-native';
import { chatInbox } from '@/styles/styles';
import { RealtimeManager, supabase } from '@/utils/supabase';
import { useAuth } from '@/providor/AuthProvidor';

/**
 * Interface for chat messages from Supabase
 */
interface Message {
  id: string;
  sender_id: string;
  content: string;
  timestamp: string;
  message_type: 'text' | 'image' | 'file' | 'system';
  read_by: string[];
  sender?: {
    display_name: string;
    avatar_url?: string;
  };
}

/**
 * Interface for chat data
 */
interface ChatData {
  id: string;
  name: string;
  type: 'ai' | 'group' | 'individual';
  isOnline?: boolean;
  isBot?: boolean;
  avatar_url?: string;
}

export default function ChatDetailScreen() {
  const { id: chatRoomId } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatData, setChatData] = useState<ChatData | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const styles = chatInbox();
  const { user } = useAuth();
  const realtimeManager = RealtimeManager.getInstance();

  // Fetch chat room details and messages
  const fetchChatData = async () => {
    if (!chatRoomId || !user) return;

    try {
      setLoading(true);

      // Fetch chat room details
      const { data: chatRoom, error: chatError } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('id', chatRoomId)
        .single();

      if (chatError) throw chatError;

      setChatData({
        id: chatRoom.id,
        name: chatRoom.name || 'Unnamed Chat',
        type: chatRoom.type,
        isBot: chatRoom.type === 'ai',
        avatar_url: chatRoom.avatar_url,
      });

      // Fetch messages with sender profiles
      const { data: messageData, error: messageError } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles(display_name, avatar_url)
        `)
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true });

      if (messageError) throw messageError;

      const formattedMessages: Message[] = (messageData || []).map(msg => ({
        id: msg.id,
        sender_id: msg.sender_id,
        content: msg.content,
        timestamp: msg.created_at,
        message_type: msg.message_type,
        read_by: msg.read_by || [],
        sender: msg.sender,
      }));

      setMessages(formattedMessages);

      // Mark messages as read
      await markMessagesAsRead();

    } catch (error) {
      console.error('Error fetching chat data:', error);
      Alert.alert('Error', 'Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async () => {
    if (!chatRoomId || !user) return;

    try {
      // Update messages that are not read by current user
      const { error } = await supabase
        .rpc('mark_messages_as_read', {
          p_chat_room_id: chatRoomId,
          p_user_id: user.id
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Subscribe to real-time messages
  useEffect(() => {
    if (!chatRoomId || !user) return;

    // Fetch initial data
    fetchChatData();

    // Subscribe to new messages
    const messageSubscription = realtimeManager.subscribeToMessages(
      chatRoomId,
      async (payload) => {
        const newMessage = payload.new;
        
        // Fetch sender profile for the new message
        const { data: sender } = await supabase
          .from('profiles')
          .select('display_name, avatar_url')
          .eq('id', newMessage.sender_id)
          .single();

        const formattedMessage: Message = {
          id: newMessage.id,
          sender_id: newMessage.sender_id,
          content: newMessage.content,
          timestamp: newMessage.created_at,
          message_type: newMessage.message_type,
          read_by: newMessage.read_by || [],
          sender: sender || { display_name: 'Unknown User' },
        };

        setMessages(prev => [...prev, formattedMessage]);
        
        // Mark as read if it's not our own message
        if (newMessage.sender_id !== user.id) {
          await markMessagesAsRead();
        }
      }
    );

    // Cleanup subscription
    return () => {
      realtimeManager.unsubscribe(`messages:${chatRoomId}`);
    };
  }, [chatRoomId, user]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !chatRoomId || !user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          chat_room_id: chatRoomId,
          sender_id: user.id,
          content: messageText.trim(),
          message_type: 'text',
          read_by: [user.id], // Mark as read by sender
        });

      if (error) throw error;

      setMessageText('');

      // Update chat room's last message
      await supabase
        .from('chat_rooms')
        .update({
          last_message: messageText.trim(),
          last_message_at: new Date().toISOString(),
        })
        .eq('id', chatRoomId);

    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const getAvatarColor = () => {
    if (chatData?.type === 'ai') return '#8b5cf6';
    if (chatData?.type === 'group') return '#10b981';
    return '#3b82f6';
  };

  const getAvatarInitials = () => {
    if (!chatData) return '';
    return chatData.name.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  const renderMessage = (message: Message) => {
    const isUserMessage = message.sender_id === user?.id;
    
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {!isUserMessage && chatData?.type !== 'ai' && (
          <View
            style={[
              styles.messageAvatar,
              { backgroundColor: getAvatarColor() },
            ]}
          >
            <Text style={styles.avatarText}>
              {message.sender?.display_name?.split(' ').map(n => n[0]).join('').substring(0, 2) || '??'}
            </Text>
          </View>
        )}
        {!isUserMessage && chatData?.type === 'ai' && (
          <View
            style={[
              styles.messageAvatar,
              { backgroundColor: getAvatarColor() },
            ]}
          >
            <Bot color="#ffffff" size={16} />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isUserMessage ? styles.userBubble : styles.otherBubble,
          ]}
        >
          {!isUserMessage && chatData?.type === 'group' && (
            <Text style={styles.senderName}>
              {message.sender?.display_name}
            </Text>
          )}
          <Text style={[styles.messageText, isUserMessage ? styles.userMessageText : styles.otherMessageText]}>
            {message.content}
          </Text>
          <Text style={[styles.messageTime, isUserMessage ? styles.userMessageTime : styles.otherMessageTime]}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  if (!chatData && loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Loading chat...</Text>
      </View>
    );
  }

  if (!chatData) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.loadingText}>Chat not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("./chat")} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.chatName}>{chatData.name}</Text>
            <Text style={styles.chatStatus}>
              {chatData.type === 'ai'
                ? 'AI Assistant'
                : chatData.type === 'group'
                ? 'Group Chat'
                : 'Online'}
            </Text>
          </View>
          {chatData.type === 'individual' && chatData.isOnline && (
            <View style={styles.onlineIndicator} />
          )}
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <MoreVertical color="#9ca3af" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyAvatar,
                { backgroundColor: getAvatarColor() },
              ]}
            >
              {chatData.type === 'ai' ? (
                <Bot color="#ffffff" size={40} />
              ) : chatData.type === 'group' ? (
                <Users color="#ffffff" size={40} />
              ) : (
                <Text style={styles.emptyAvatarText}>{getAvatarInitials()}</Text>
              )}
            </View>
            <Text style={styles.emptyTitle}>{chatData.name}</Text>
            <Text style={styles.emptySubtitle}>
              {chatData.type === 'ai'
                ? 'Start a conversation with our AI assistant'
                : chatData.type === 'group'
                ? 'This is the beginning of the group chat'
                : 'This is the beginning of your conversation'}
            </Text>
          </View>
        ) : (
          messages.map(renderMessage)
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { paddingBottom: insets.bottom }]}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip color="#10b981" size={20} />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#6b7280"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxHeight={100}
            onSubmitEditing={handleSendMessage}
          />

          <TouchableOpacity style={styles.emojiButton}>
            <Smile color="#10b981" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendButton,
              !messageText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send
              color={messageText.trim() ? '#ffffff' : '#6b7280'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}