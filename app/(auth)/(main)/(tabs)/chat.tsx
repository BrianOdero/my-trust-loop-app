// Add these imports at the top
import { useState, useCallback, useRef } from 'react';
import ContactSelectionModal from '@/components/ContactSelectionModal';
import GroupCreationModal from '@/components/GroupCreationModal';
import { AppContact } from '@/hooks/useContacts';
import { useContacts } from '@/hooks/useContacts';
import { chatStyles } from '@/styles/styles';
import { useRouter } from 'expo-router';
import { RealtimeManager, supabase } from '@/utils/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { Alert, ScrollView, TextInput } from 'react-native';
import { View } from 'react-native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { 
  MessageCircle, 
  Search, 
  Users, 
  Bot,
  MoreVertical,
  X,
  MessageSquare,
  Trash2
} from 'lucide-react-native';
import { useAuth } from '@/providor/AuthProvidor';
import { RefreshControl } from 'react-native';

interface Chat {
  id: string;
  name: string;
  type: 'ai' | 'group' | 'individual';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  avatar?: string;
  isOnline?: boolean;
  isBot?: boolean;
  otherUserId?: string;
  otherUserPhone?: string;
}

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'individual' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Add these state variables for modals
  const [showContactModal, setShowContactModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<AppContact[]>([]);
  const [contactModalMode, setContactModalMode] = useState<'individual' | 'group'>('individual');
  
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const styles = chatStyles();
  const { user } = useAuth();
  const { requestPermission, checkPermission, registeredContacts, refreshContacts } = useContacts();
  const realtimeManager = RealtimeManager.getInstance();
  
  // Use ref to prevent multiple simultaneous fetches
  const isFetching = useRef(false);

  // Get display name for individual chat based on phone number
  const getChatDisplayName = (chat: any, otherUserPhone: string): string => {
    if (chat.type !== 'individual') {
      return chat.name || 'Unnamed Chat';
    }

    // Find the contact in registered contacts by phone number
    const contact = registeredContacts.find(c => 
      c.phoneNumbers.some(phone => phone === otherUserPhone)
    );
    
    if (contact) {
      return contact.name; // Use device contact name
    }
    
    // Fallback: use the phone number or database name
    return otherUserPhone || chat.name || 'Unknown Contact';
  };

  // Fetch user's chat rooms with optimized loading
  const fetchChatRooms = async (showLoading: boolean = true) => {
    if (!user || isFetching.current) return;

    try {
      isFetching.current = true;
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      
      const { data: chatRooms, error } = await supabase
        .from('chat_room_members')
        .select(`
          chat_room_id,
          chat_rooms (
            id,
            name,
            type,
            avatar_url,
            last_message,
            last_message_at,
            created_by,
            created_at
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      // Get all individual chat room IDs to fetch other members
      const individualChatIds = (chatRooms || [])
        .filter((room: any) => room.chat_rooms.type === 'individual')
        .map((room: any) => room.chat_room_id);

      let otherUsersMap = new Map();

      if (individualChatIds.length > 0) {
        // Get other members for individual chats with their phone numbers
        const { data: otherMembers, error: membersError } = await supabase
          .from('chat_room_members')
          .select(`
            chat_room_id,
            user_id,
            profiles!inner(display_name, phone_number)
          `)
          .in('chat_room_id', individualChatIds)
          .neq('user_id', user.id);

        if (!membersError && otherMembers) {
          otherMembers.forEach(member => {
            otherUsersMap.set(member.chat_room_id, {
              userId: member.user_id,
              displayName: member.profiles.display_name,
              phoneNumber: member.profiles.phone_number
            });
          });
        }
      }

      // Format chats with proper display names
      const formattedChats: Chat[] = (chatRooms || []).map((room: any) => {
        const chatRoom = room.chat_rooms;
        
        let displayName = chatRoom.name || 'Unnamed Chat';
        let otherUserId: string | undefined;
        let otherUserPhone: string | undefined;

        // For individual chats, get display name from device contacts
        if (chatRoom.type === 'individual') {
          const otherUser = otherUsersMap.get(chatRoom.id);
          if (otherUser) {
            otherUserId = otherUser.userId;
            otherUserPhone = otherUser.phoneNumber;
            displayName = getChatDisplayName(chatRoom, otherUser.phoneNumber);
          }
        }

        return {
          id: chatRoom.id,
          name: displayName, // This is the display name for the UI
          type: chatRoom.type as 'ai' | 'group' | 'individual',
          lastMessage: chatRoom.last_message || 'No messages yet',
          lastMessageTime: chatRoom.last_message_at || chatRoom.created_at,
          unreadCount: 0,
          isOnline: false,
          isBot: chatRoom.type === 'ai',
          otherUserId: otherUserId,
          otherUserPhone: otherUserPhone,
        };
      });

      // Sort by last message time
      const sortedChats = formattedChats.sort((a, b) => {
        const aTime = new Date(a.lastMessageTime).getTime();
        const bTime = new Date(b.lastMessageTime).getTime();
        return bTime - aTime;
      });

      setChats(sortedChats);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      if (showLoading) {
        Alert.alert('Error', 'Failed to load chats');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      isFetching.current = false;
    }
  };

  // Manual refresh function
  const handleRefresh = async () => {
    await fetchChatRooms(false);
  };

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    fetchChatRooms();

    const chatRoomSubscription = realtimeManager.subscribeToChatRooms(
      user.id,
      (payload) => {
        fetchChatRooms(false); // Don't show loading on real-time updates
      }
    );

    return () => {
      realtimeManager.unsubscribe(`chatrooms:${user.id}`);
    };
  }, [user]);

  // Refresh chats when registered contacts are loaded (but only once)
  useEffect(() => {
    if (chats.length > 0 && registeredContacts.length > 0 && !isFetching.current) {
      // Update chat names based on newly loaded contacts
      const updatedChats = chats.map(chat => {
        if (chat.type === 'individual' && chat.otherUserPhone) {
          const newName = getChatDisplayName(chat, chat.otherUserPhone);
          return { ...chat, name: newName };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  }, [registeredContacts]);

  // Group Creation Functions
  const handleStartIndividualChat = async () => {
    console.log('=== Starting individual chat flow ===');
    const granted = await requestPermission();
    console.log('Individual chat - Permission granted:', granted);
    if (granted) {
      // Refresh contacts before showing modal
      await refreshContacts();
      setContactModalMode('individual');
      setShowContactModal(true);
    }
  };

  const handleStartGroupChat = async () => {
    console.log('=== Starting group chat flow ===');
    
    const currentPermission = await checkPermission();
    console.log('Current permission status:', currentPermission);
    
    const granted = await requestPermission();
    console.log('Group chat - Permission granted:', granted);
    
    if (granted) {
      // Refresh contacts before showing modal
      await refreshContacts();
      setContactModalMode('group');
      setShowContactModal(true);
      console.log('Contact modal should be visible now');
    } else {
      console.log('Permission denied, cannot show contact modal');
    }
  };

  const handleContactsSelected = async (contacts: AppContact[]) => {
    console.log('=== Contacts selected ===');
    console.log('Number of contacts selected:', contacts.length);
    console.log('Modal mode:', contactModalMode);
    
    if (contactModalMode === 'individual') {
      console.log('Creating individual chat with:', contacts[0]?.name);
      await createIndividualChat(contacts[0]);
    } else {
      console.log('Preparing to create group with contacts:', contacts.map(c => c.name));
      setSelectedContacts(contacts);
      setShowContactModal(false);
      setTimeout(() => {
        setShowGroupModal(true);
      }, 100);
    }
  };

  // Individual chat creation
  const createIndividualChat = async (contact: AppContact) => {
    if (!user || !contact.userId) {
      Alert.alert('Error', 'Cannot start chat with this contact');
      return;
    }

    try {
      console.log('Creating individual chat between:', user.id, 'and', contact.userId);
      
      // Use the database function
      const { data: chatRoomId, error } = await supabase.rpc('get_or_create_individual_chat', {
        user1_id: user.id,
        user2_id: contact.userId
      });

      if (error) {
        console.error('Database function error:', error);
        throw error;
      }

      if (!chatRoomId) {
        throw new Error('No chat room ID returned from database function');
      }

      console.log('Chat created with ID:', chatRoomId);
      
      await fetchChatRooms(false);
      setShowContactModal(false);
      
      // Small delay to ensure chat is created
      setTimeout(() => {
        router.push(`./${chatRoomId}`);
      }, 500);

    } catch (error: any) {
      console.error('Error creating individual chat:', error);
      Alert.alert('Error', error.message || 'Failed to start chat');
    }
  };

  const handleGroupCreated = async (groupId: string) => {
    console.log('=== Group created successfully ===');
    console.log('Group ID:', groupId);
    
    await fetchChatRooms(false);
    router.push(`./${groupId}`);
    setShowGroupModal(false);
    setSelectedContacts([]);
  };

  // Delete chat function
  const deleteChat = async (chatId: string, chatName: string) => {
    Alert.alert(
      'Delete Chat',
      `Are you sure you want to delete "${chatName}"? This action cannot be undone.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Delete the chat room (this will cascade to messages and members due to foreign key constraints)
              const { error } = await supabase
                .from('chat_rooms')
                .delete()
                .eq('id', chatId);

              if (error) {
                console.error('Error deleting chat:', error);
                Alert.alert('Error', 'Failed to delete chat');
                return;
              }

              // Remove from local state
              setChats(prev => prev.filter(chat => chat.id !== chatId));
              
              Alert.alert('Success', 'Chat deleted successfully');
              
            } catch (error) {
              console.error('Error deleting chat:', error);
              Alert.alert('Error', 'Failed to delete chat');
            }
          },
        },
      ]
    );
  };

  /**
   * Filters chats based on selected tab and search query
   */
  const filteredChats = chats.filter(chat => {
    let tabMatch = true;
    if (activeTab === 'ai') tabMatch = chat.type === 'ai';
    else if (activeTab === 'groups') tabMatch = chat.type === 'group';
    else if (activeTab === 'individual') tabMatch = chat.type === 'individual';

    if (!searchQuery.trim()) return tabMatch;
    
    const query = searchQuery.toLowerCase();
    return tabMatch && (
      chat.name.toLowerCase().includes(query) ||
      chat.lastMessage.toLowerCase().includes(query)
    );
  });

  // Check if we have any chats
  const hasChats = filteredChats.length > 0;

  /**
   * Formats timestamp to relative time
   */
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  /**
   * Gets appropriate avatar background color based on chat type
   */
  const getAvatarColor = (chat: Chat) => {
    if (chat.type === 'ai') return '#8b5cf6';
    if (chat.type === 'group') return '#10b981';
    return '#3b82f6';
  };

  /**
   * Renders individual chat item with delete functionality
   */
  const renderChat = (chat: Chat) => (
    <TouchableOpacity 
      key={chat.id} 
      style={styles.chatItem}
      onPress={() => router.push(`./${chat.id}`)}
    >
      <View style={styles.avatarContainer}>
        <View style={[
          styles.avatar,
          { backgroundColor: getAvatarColor(chat) }
        ]}>
          {chat.type === 'ai' ? (
            <Bot color="#ffffff" size={20} />
          ) : chat.type === 'group' ? (
            <Users color="#ffffff" size={20} />
          ) : (
            <Text style={styles.avatarText}>
              {chat.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </Text>
          )}
        </View>
        {chat.type === 'individual' && chat.isOnline && (
          <View style={styles.onlineIndicator} />
        )}
        {chat.type === 'ai' && (
          <View style={styles.botIndicator}>
            <Bot color="#8b5cf6" size={12} />
          </View>
        )}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>
            {chat.name}
            {chat.type === 'ai' && <Text style={styles.botLabel}> • AI</Text>}
          </Text>
          <Text style={styles.chatTime}>{formatTime(chat.lastMessageTime)}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Three dots menu with delete option */}
      <TouchableOpacity 
        style={styles.moreButton}
        onPress={() => {
          // Show action sheet for delete
          Alert.alert(
            'Chat Options',
            `What would you like to do with "${chat.name}"?`,
            [
              {
                text: 'Delete Chat',
                style: 'destructive',
                onPress: () => deleteChat(chat.id, chat.name)
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        }}
      >
        <MoreVertical color="#6b7280" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Empty State Component with two buttons
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <MessageSquare color="#9ca3af" size={64} />
        <View style={styles.emptyIconDecoration}>
          <MessageCircle color="#e5e7eb" size={32} />
        </View>
        <View style={[styles.emptyIconDecoration, { top: 20, right: 40 }]}>
          <MessageCircle color="#f3f4f6" size={24} />
        </View>
      </View>
      <Text style={styles.emptyTitle}>No chats yet</Text>
      <Text style={styles.emptySubtitle}>
        Start a conversation with friends or create a group to get started
      </Text>
      
      {/* Two buttons for empty state */}
      <View style={styles.emptyStateActions}>
        <TouchableOpacity 
          style={[styles.emptyActionButton, styles.emptyIndividualButton]}
          onPress={handleStartIndividualChat}
        >
          <MessageCircle color="#3b82f6" size={20} />
          <Text style={styles.emptyActionButtonText}>Start New Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.emptyActionButton, styles.emptyGroupButton]}
          onPress={handleStartGroupChat}
        >
          <Users color="#10b981" size={20} />
          <Text style={styles.emptyActionButtonText}>Start New Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Bottom Quick Actions Component (only shown when there are chats)
  const renderQuickActions = () => {
    if (hasChats) {
      return (
        <View style={[styles.quickActions, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity 
            style={[styles.quickAction, styles.groupAction]}
            onPress={handleStartGroupChat}
          >
            <Users color="#10b981" size={20} />
            <Text style={styles.quickActionText}>New Group</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickAction, styles.individualAction]}
            onPress={handleStartIndividualChat}
          >
            <MessageCircle color="#3b82f6" size={20} />
            <Text style={styles.quickActionText}>New Chat</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header - Removed Plus icon */}
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setIsSearching(!isSearching)}
          >
            <Search color="#6b7280" size={20} />
          </TouchableOpacity>
          {/* Removed the Plus button */}
        </View>
      </View>

      {/* Search Bar */}
      {isSearching && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search color="#6b7280" size={18} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search chats..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X color="#6b7280" size={18} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            onPress={() => {
              setIsSearching(false);
              setSearchQuery('');
            }}
            style={styles.searchCancelButton}
          >
            <Text style={styles.searchCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'ai', 'groups', 'individual'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, activeTab === tab && styles.activeFilterTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.filterText,
              activeTab === tab && styles.activeFilterText,
            ]}>
              {tab === 'all' ? 'All' : 
               tab === 'ai' ? 'AI' :
               tab === 'groups' ? 'Groups' : 'Individual'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chats List or Empty State */}
      <View style={styles.chatsContainer}>
        {loading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Loading chats...</Text>
          </View>
        ) : hasChats ? (
          <ScrollView 
            style={styles.scrollView} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
            refreshControl={
              <ScrollView refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={['#10b981']}
                  tintColor="#10b981"
                />
              } />
            }
          >
            {filteredChats.map(renderChat)}
          </ScrollView>
        ) : (
          renderEmptyState()
        )}
      </View>

      {/* Quick Actions - Only shown when there are chats */}
      {renderQuickActions()}

      {/* Add Modals at the end */}
      <ContactSelectionModal
        visible={showContactModal}
        onClose={() => setShowContactModal(false)}
        onContactsSelected={handleContactsSelected}
        mode={contactModalMode}
        registeredContacts={registeredContacts}
        loading={loading}
        refreshContacts={refreshContacts as any}
      />

      <GroupCreationModal
        visible={showGroupModal}
        onClose={() => {
          setShowGroupModal(false);
          setSelectedContacts([]);
        }}
        selectedContacts={selectedContacts}
        onGroupCreated={handleGroupCreated}
      />
    </View>
  );
}