
import { useWallet } from '@/contexts/walletcontext';
import { dashboardStyles } from '@/styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Bell,
  Calendar,
  Eye,
  EyeOff,
  Menu,
  TrendingUp,
  Wallet,
  CreditCard,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Dashboard screen component with professional bank-style wallet card
 * Features typing animation for welcome message and balance visibility toggle
 */
export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
 
  const { individualWallet, groupWallets, isBalanceVisible, toggleBalanceVisibility } = useWallet();
  const styles = dashboardStyles()
  
  // Animation and state management
  const [displayedText, setDisplayedText] = useState('');
  const [displayedSubtext, setDisplayedSubtext] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0); // 0: main text, 1: subtext, 2: complete
  
  // Animated values for card entrance
  const cardScale = new Animated.Value(0.8);
  const cardOpacity = new Animated.Value(0);
  
  // User and wallet data
  const userName = 'kelvin';
  const welcomeText = `Welcome back, ${userName}`;
  const subtitleText = 'Your financial growth starts here';
  
  // Calculate total group savings
  const totalGroupSavings = groupWallets.reduce((total, wallet) => total + wallet.balance, 0);

  /**
   * Typing animation effect for welcome messages
   */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (animationPhase === 0) {
      // Type main welcome text
      if (displayedText.length < welcomeText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(welcomeText.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        // Move to subtitle after a brief pause
        timeoutId = setTimeout(() => {
          setAnimationPhase(1);
        }, 500);
      }
    } else if (animationPhase === 1) {
      // Type subtitle text
      if (displayedSubtext.length < subtitleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedSubtext(subtitleText.slice(0, displayedSubtext.length + 1));
        }, 80);
      } else {
        // Animation complete, stop cursor
        setAnimationPhase(2);
        setShowCursor(false);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, displayedSubtext, animationPhase]);

  /**
   * Cursor blinking animation
   */
  useEffect(() => {
    if (animationPhase < 2) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [animationPhase]);

  /**
   * Card entrance animation
   */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  
  /**
   * Formats currency with proper spacing and hiding
   */
  const formatBalance = (amount: number, isVisible: boolean) => {
    if (!isVisible) return '••••••';
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          
          <View style={styles.headerCenter}>
            <Text style={styles.greeting}>Dashboard</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => {
              router.push('../notifications');
            }}
          >
            <Bell color="#ffffff" size={24} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>4</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Animated Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>
            {displayedText}
            {animationPhase === 0 && showCursor && <Text style={styles.cursor}>|</Text>}
          </Text>
          <Text style={styles.welcomeSubtitle}>
            {displayedSubtext}
            {animationPhase === 1 && showCursor && <Text style={styles.cursor}>|</Text>}
          </Text>
        </View>

        {/* Individual Wallet Card */}
        <Animated.View 
          style={[
            styles.walletCardContainer,
            {
              transform: [{ scale: cardScale }],
              opacity: cardOpacity,
            }
          ]}
        >
          <LinearGradient
            colors={['#1e293b', '#334155', '#475569']}
            style={styles.walletCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Card Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Wallet color="#10b981" size={24} />
                <Text style={styles.cardTitle}>Individual Wallet</Text>
              </View>
              <TouchableOpacity 
                style={styles.visibilityToggle}
                onPress={toggleBalanceVisibility}
              >
                {isBalanceVisible ? (
                  <Eye color="#94a3b8" size={20} />
                ) : (
                  <EyeOff color="#94a3b8" size={20} />
                )}
              </TouchableOpacity>
            </View>

            {/* Balance Display */}
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>
                {formatBalance(individualWallet.balance, isBalanceVisible)}
              </Text>
            </View>

            {/* Card Details */}
            <View style={styles.cardDetails}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>Account</Text>
                <Text style={styles.cardValue}>
                  {isBalanceVisible ? `****${individualWallet.accountNumber.slice(-4)}` : '••••••••'}
                </Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>Card</Text>
                <Text style={styles.cardValue}>
                  {isBalanceVisible ? `****  ****  ****  ${individualWallet.cardNumber.slice(-4)}` : '••••  ••••  ••••  ••••'}
                </Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardLabel}>Expires</Text>
                <Text style={styles.cardValue}>
                  {isBalanceVisible ? individualWallet.expiryDate : '••/••'}
                </Text>
              </View>
            </View>

            {/* Card Chip and Logo */}
            <View style={styles.cardFooter}>
              <View style={styles.chipContainer}>
                <View style={styles.chip} />
                <CreditCard color="#94a3b8" size={16} />
              </View>
              <Text style={styles.cardBrand}>TrustLoop</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Savings Overview */}
        <View style={styles.savingsCard}>
          <View style={styles.savingsHeader}>
            <TrendingUp color="#10b981" size={24} />
            <Text style={styles.savingsLabel}>Group Savings</Text>
          </View>
          <Text style={styles.savingsAmount}>
            {formatBalance(89200, isBalanceVisible)}
          </Text>
          
          <View style={styles.paymentInfo}>
            <Calendar color="#6b7280" size={16} />
            <Text style={styles.paymentText}>Next contribution</Text>
            <Text style={styles.paymentDate}>Aug 28, 2024 • KES 5,000</Text>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Cycle progress 82%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '82%' }]} />
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <TrendingUp color="#10b981" size={16} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Group Contribution</Text>
                <Text style={styles.activitySubtitle}>Mama Mboga Chama</Text>
              </View>
              <Text style={styles.activityAmount}>-KES 5,000</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Wallet color="#3b82f6" size={16} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Wallet Top-up</Text>
                <Text style={styles.activitySubtitle}>M-Pesa Transfer</Text>
              </View>
              <Text style={styles.activityAmount}>+KES 10,000</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

