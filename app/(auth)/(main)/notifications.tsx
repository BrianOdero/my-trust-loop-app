import { notificationStyle } from '@/styles/styles';
import { Stack } from 'expo-router';
import {
  Bell,
  CheckCircle,
  DollarSign,
  Info,
  TrendingUp,
  Users
} from 'lucide-react-native';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Notification {
  id: string;
  type: 'payment' | 'group' | 'loan' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Due Tomorrow',
    message: 'Your monthly contribution of KES 5,000 for Family Savings Circle is due tomorrow.',
    timestamp: '2024-08-27T10:30:00Z',
    isRead: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'group',
    title: 'New Member Joined',
    message: 'Sarah Mwangi has joined your Business Partners Fund group.',
    timestamp: '2024-08-26T15:45:00Z',
    isRead: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Savings Milestone Reached!',
    message: 'Congratulations! You\'ve saved over KES 100,000 across all your groups.',
    timestamp: '2024-08-25T09:15:00Z',
    isRead: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'loan',
    title: 'Loan Application Approved',
    message: 'Your loan application for KES 50,000 has been approved. Funds will be disbursed within 24 hours.',
    timestamp: '2024-08-24T14:20:00Z',
    isRead: true,
    priority: 'high',
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update Available',
    message: 'A new version of TrustSave is available with improved security features.',
    timestamp: '2024-08-23T11:00:00Z',
    isRead: true,
    priority: 'low',
  },
  {
    id: '6',
    type: 'group',
    title: 'Group Meeting Reminder',
    message: 'Monthly meeting for Community Development group is scheduled for tomorrow at 2 PM.',
    timestamp: '2024-08-22T16:30:00Z',
    isRead: true,
    priority: 'medium',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const insets = useSafeAreaInsets();
  const styles = notificationStyle()

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.isRead
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment': return <DollarSign color="#10b981" size={20} />;
      case 'group': return <Users color="#3b82f6" size={20} />;
      case 'loan': return <DollarSign color="#f59e0b" size={20} />;
      case 'achievement': return <TrendingUp color="#10b981" size={20} />;
      case 'system': return <Info color="#6b7280" size={20} />;
      default: return <Bell color="#6b7280" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const formatTimestamp = (timestamp: string) => {
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

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity 
      key={notification.id} 
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadCard,
      ]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.iconContainer}>
          {getNotificationIcon(notification.type)}
        </View>
        <View style={styles.notificationContent}>
          <View style={styles.titleRow}>
            <Text style={[
              styles.notificationTitle,
              !notification.isRead && styles.unreadTitle,
            ]}>
              {notification.title}
            </Text>
            <View style={styles.metaContainer}>
              <View style={[
                styles.priorityDot,
                { backgroundColor: getPriorityColor(notification.priority) },
              ]} />
              <Text style={styles.timestamp}>
                {formatTimestamp(notification.timestamp)}
              </Text>
            </View>
          </View>
          <Text style={styles.notificationMessage}>
            {notification.message}
          </Text>
        </View>
      </View>
      {!notification.isRead && (
        <View style={styles.unreadIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Notifications',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            unreadCount > 0 && (
              <TouchableOpacity onPress={markAllAsRead}>
                <Text style={styles.markAllRead}>Mark all read</Text>
              </TouchableOpacity>
            )
          ),
        }} 
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Bell color="#10b981" size={24} />
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>Notifications</Text>
              <Text style={styles.summarySubtitle}>
                {unreadCount > 0 
                  ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterText,
              filter === 'all' && styles.activeFilterText,
            ]}>
              All ({notifications.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterTab, filter === 'unread' && styles.activeFilterTab]}
            onPress={() => setFilter('unread')}
          >
            <Text style={[
              styles.filterText,
              filter === 'unread' && styles.activeFilterText,
            ]}>
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(renderNotification)
          ) : (
            <View style={styles.emptyState}>
              {filter === 'unread' ? (
                <CheckCircle color="#10b981" size={48} />
              ) : (
                <Bell color="#6b7280" size={48} />
              )}
              <Text style={styles.emptyTitle}>
                {filter === 'unread' ? 'All caught up!' : 'No notifications'}
              </Text>
              <Text style={styles.emptySubtitle}>
                {filter === 'unread' 
                  ? 'You have no unread notifications'
                  : 'Your notifications will appear here'
                }
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

