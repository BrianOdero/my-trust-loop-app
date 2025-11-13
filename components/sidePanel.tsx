import { useSidePanel } from '@/contexts/sidepanelcontext';
import { router } from 'expo-router';
import * as Icons from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavigationItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  route?: string;
  onPress?: () => void;
  badge?: string;
  children?: NavigationItem[];
}

interface SidePanelProps {
  animatedValue: Animated.Value;
}

/**
 * Cleaned up side panel with only non-tab accessible features
 * Includes theme toggle and proper navigation structure
 */
export default function SidePanel({ animatedValue }: SidePanelProps) {
  const insets = useSafeAreaInsets();
  const { closePanel } = useSidePanel();
  const { width: screenWidth } = useWindowDimensions();
  const PANEL_WIDTH = screenWidth * 0.8;
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  /**
   * Handles theme toggle
   */
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // TODO: Implement actual theme switching with context
    console.log('Theme toggled:', !isDarkTheme ? 'Dark' : 'Light');
  };

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      title: 'Home',
      icon: <Icons.Home color="#10b981" size={20} />,
      onPress: () => {
        console.log('=== NAVIGATION: Dashboard ===');
        router.push('/(main)/(tabs)/dashboard');
        closePanel();
      },
    },
    
    {
      id: 'investments',
      title: 'Investments',
      icon: <Icons.TrendingUp color="#10b981" size={20} />,
      children: [
        {
          id: 'portfolio',
          title: 'Portfolio',
          icon: <Icons.PiggyBank color="#6b7280" size={18} />,
          onPress: () => {
            console.log('=== NAVIGATION: Portfolio ===');
            router.push('/(main)/portfolio');
            closePanel();
          },
        },
        {
          id: 'reports',
          title: 'Reports',
          icon: <Icons.History color="#6b7280" size={18} />,
          onPress: () => {
            console.log('=== NAVIGATION: Reports ===');
            router.push('/(main)/reports');
            closePanel();
          },
        },
      ],
    },
    {
      id: 'thryv',
      title: 'Thryv',
      icon: <Icons.Flower color="#e91e63" size={20} />,
      onPress: () => {
        console.log('=== NAVIGATION: Thryv ===');
        router.push('/(main)/thryv');
        closePanel();
      },
    },
  ];

  const quickAccessItems: NavigationItem[] = [
   
    
    {
      id: 'help-support',
      title: 'Help & Support',
      icon: <Icons.HelpCircle color="#6b7280" size={20} />,
      onPress: () => {
        console.log('=== NAVIGATION: Help ===');
        router.push('/(main)/help');
        closePanel();
      },
    },
  ];

  const renderNavigationItem = (item: NavigationItem, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0;
    
    return (
      <View key={item.id}>
        <TouchableOpacity
          style={[
            styles.navigationItem,
            isChild && styles.childNavigationItem,
          ]}
          onPress={item.onPress}
          testID={`nav-item-${item.id}`}
        >
          <View style={styles.navigationItemLeft}>
            <View style={[styles.iconContainer, isChild && styles.childIconContainer]}>
              {item.icon}
            </View>
            <Text style={[styles.navigationText, isChild && styles.childNavigationText]}>
              {item.title}
            </Text>
          </View>
          <View style={styles.navigationItemRight}>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
            {hasChildren && (
              <Icons.ChevronRight color="#6b7280" size={16} />
            )}
          </View>
        </TouchableOpacity>
        
        {hasChildren && (
          <View style={styles.childrenContainer}>
            {item.children?.map((child) => {
              if (!child.id || child.id.trim().length === 0 || child.id.length > 100) return null;
              const sanitizedChild = { ...child, id: child.id.trim() };
              return renderNavigationItem(sanitizedChild, true);
            })}
          </View>
        )}
      </View>
    );
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-PANEL_WIDTH, 0],
  });

  const overlayOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  return (
    <>
      {/* Overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayOpacity,
            pointerEvents: Platform.OS === 'web' ? 'auto' : 'box-none',
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={closePanel}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Side Panel */}
      <Animated.View
        style={[
          styles.panel,
          {
            transform: [{ translateX }],
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>TL</Text>
            </View>
            <View>
              <Text style={styles.appName}>TrustLoop</Text>
              <Text style={styles.userName}>Amina Yusuf</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closePanel}
            testID="close-panel-button"
          >
            <Icons.X color="#6b7280" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Main Navigation */}
          <View style={styles.section}>
            {navigationItems.map((item) => {
              if (!item.id || item.id.trim().length === 0 || item.id.length > 100) return null;
              const sanitizedItem = { ...item, id: item.id.trim() };
              return renderNavigationItem(sanitizedItem);
            })}
          </View>

          {/* Quick Access */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            {quickAccessItems.map((item) => {
              if (!item.id || item.id.trim().length === 0 || item.id.length > 100) return null;
              const sanitizedItem = { ...item, id: item.id.trim() };
              return renderNavigationItem(sanitizedItem);
            })}
          </View>

          {/* Theme Toggle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <View style={styles.themeToggleLeft}>
                {isDarkTheme ? (
                  <Icons.Moon color="#10b981" size={20} />
                ) : (
                  <Icons.Sun color="#f59e0b" size={20} />
                )}
                <Text style={styles.themeToggleText}>
                  {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </View>
              <View style={[styles.toggle, !isDarkTheme && styles.toggleLight]}>
                <View style={[
                  styles.toggleActive,
                  !isDarkTheme && styles.toggleActiveLeft
                ]} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Profile Section */}
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.profileSection}
              onPress={() => {
                console.log('=== NAVIGATION: Profile ===');
                router.push('/(main)/(tabs)/profile');
                closePanel();
              }}
              testID="profile-section"
            >
              <View style={styles.profileAvatar}>
                <Icons.User color="#ffffff" size={20} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Amina Yusuf</Text>
                <Text style={styles.profileEmail}>View Profile</Text>
              </View>
              <Icons.ChevronRight color="#6b7280" size={16} />
            </TouchableOpacity>
          </View>

          {/* Logout */}
          
        </ScrollView>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    zIndex: 998,
  },
  overlayTouchable: {
    flex: 1,
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#1a1a1a',
    zIndex: 999,
    borderRightWidth: 1,
    borderRightColor: '#374151',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  userName: {
    fontSize: 12,
    color: '#6b7280',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 48,
  },
  childNavigationItem: {
    paddingLeft: 52,
    paddingVertical: 8,
    minHeight: 40,
  },
  navigationItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navigationItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  childIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  navigationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  childNavigationText: {
    fontSize: 14,
    color: '#d1d5db',
  },
  childrenContainer: {
    backgroundColor: '#111111',
  },
  badge: {
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  themeToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginLeft: 12,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleLight: {
    backgroundColor: '#f59e0b',
  },
  toggleActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
  },
  toggleActiveLeft: {
    alignSelf: 'flex-start',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
});