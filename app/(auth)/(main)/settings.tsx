import { useSidePanel } from '@/contexts/sidepanelcontext';
import { useWallet } from '@/contexts/walletcontext';
import WalletSettings from '@/components/WalletSettings';
import {
  ArrowLeft,
  Bell,
  Check,
  Crown,
  Edit,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  User,
  Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { settingsStyles } from '@/styles/styles';

/**
 * Interface for premium plan features
 */
interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
}

/**
 * Comprehensive settings screen with premium features and user management
 * Includes account, premium, and preferences tabs as shown in the reference image
 */
export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { togglePanel } = useSidePanel();
  const { isBalanceVisible } = useWallet();
  const styles = settingsStyles()
  
  const [activeTab, setActiveTab] = useState<'account' | 'premium' | 'preferences'>('account');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Amina Yusuf',
    email: 'amina.yusuf@example.com',
    phone: '+254733456789',
    location: 'Nairobi, Kenya',
    memberSince: 'January 2024',
  });

  // Premium plans data
  const premiumPlans: PremiumPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      period: 'month',
      features: [
        'Up to 3 savings groups',
        'Basic analytics',
        'Standard support',
        'Mobile app access',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 299,
      period: 'month',
      popular: true,
      features: [
        'Unlimited savings groups',
        'Advanced analytics & insights',
        'Priority customer support',
        'Investment opportunities',
        'Financial planning tools',
        'Custom savings goals',
        'Export financial reports',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 599,
      period: 'month',
      features: [
        'Everything in Premium',
        'Personal financial advisor',
        'Exclusive investment deals',
        'Tax optimization tools',
        'White-label group creation',
        'API access for businesses',
        'Custom integrations',
      ],
    },
  ];

  /**
   * Handles saving user information changes
   */
  const handleSaveUserInfo = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Your information has been updated successfully');
  };

  /**
   * Handles premium plan selection
   */
  const handleSelectPlan = (planId: string) => {
    const plan = premiumPlans.find(p => p.id === planId);
    if (plan && plan.price > 0) {
      Alert.alert(
        'Upgrade to Premium',
        `Upgrade to ${plan.name} for KES ${plan.price}/${plan.period}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => console.log(`Upgrading to ${plan.name}`) },
        ]
      );
    }
  };

  /**
   * Renders account information tab
   */
  const renderAccountTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Account Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Edit color="#10b981" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.userCard}>
          <View style={styles.userAvatar}>
            <Text style={styles.userAvatarText}>AY</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userStatus}>Premium Member</Text>
          </View>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <User color="#6b7280" size={20} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.name}
                  onChangeText={(text) => setUserInfo({...userInfo, name: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.name}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <Mail color="#6b7280" size={20} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.email}
                  onChangeText={(text) => setUserInfo({...userInfo, email: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.email}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <Phone color="#6b7280" size={20} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.phone}
                  onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.phone}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <MapPin color="#6b7280" size={20} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              {isEditing ? (
                <TextInput
                  style={styles.infoInput}
                  value={userInfo.location}
                  onChangeText={(text) => setUserInfo({...userInfo, location: text})}
                />
              ) : (
                <Text style={styles.infoValue}>{userInfo.location}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoItem}>
            <Star color="#6b7280" size={20} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>{userInfo.memberSince}</Text>
            </View>
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveUserInfo}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Security & Privacy */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security & Privacy</Text>
        <Text style={styles.sectionSubtitle}>Keep your account secure</Text>

        <View style={styles.securityList}>
          <TouchableOpacity style={styles.securityItem}>
            <Lock color="#6b7280" size={20} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Change Password</Text>
              <Text style={styles.securitySubtitle}>Last changed 30 days ago</Text>
            </View>
            <Check color="#10b981" size={16} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.securityItem}>
            <Shield color="#6b7280" size={20} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Two-Factor Authentication</Text>
              <Text style={styles.securitySubtitle}>Add an extra layer of security</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.securityItem}>
            <Bell color="#6b7280" size={20} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Login Alerts</Text>
              <Text style={styles.securitySubtitle}>Get notified of new device logins</Text>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleActive} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Wallet Settings Integration */}
      <WalletSettings />
    </ScrollView>
  );

  /**
   * Renders premium plans tab
   */
  const renderPremiumTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <Text style={styles.sectionSubtitle}>Unlock premium features and grow your savings faster</Text>

        <View style={styles.plansContainer}>
          {premiumPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, plan.popular && styles.popularPlan]}
              onPress={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Crown color="#ffffff" size={16} />
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}

              <View style={styles.planHeader}>
                <Text style={styles.planName}>{plan.name}</Text>
                <View style={styles.planPrice}>
                  <Text style={styles.planPriceAmount}>
                    {plan.price === 0 ? 'Free' : `KES ${plan.price}`}
                  </Text>
                  {plan.price > 0 && (
                    <Text style={styles.planPricePeriod}>/{plan.period}</Text>
                  )}
                </View>
              </View>

              <View style={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.planFeature}>
                    <Check color="#10b981" size={16} />
                    <Text style={styles.planFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={[styles.planButton, plan.popular && styles.popularPlanButton]}
                onPress={() => handleSelectPlan(plan.id)}
              >
                <Text style={[styles.planButtonText, plan.popular && styles.popularPlanButtonText]}>
                  {plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  /**
   * Renders preferences tab
   */
  const renderPreferencesTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <Text style={styles.sectionSubtitle}>Customize your app experience</Text>

        <View style={styles.preferencesList}>
          <View style={styles.preferenceItem}>
            <Globe color="#6b7280" size={20} />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Language</Text>
              <Text style={styles.preferenceValue}>English</Text>
            </View>
          </View>

          <View style={styles.preferenceItem}>
            <Zap color="#6b7280" size={20} />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Currency</Text>
              <Text style={styles.preferenceValue}>KES (Kenyan Shilling)</Text>
            </View>
          </View>

          <View style={styles.preferenceItem}>
            <Bell color="#6b7280" size={20} />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Push Notifications</Text>
              <Text style={styles.preferenceSubtitle}>Receive updates about your savings</Text>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleActive} />
            </View>
          </View>

          <View style={styles.preferenceItem}>
            <Shield color="#6b7280" size={20} />
            <View style={styles.preferenceContent}>
              <Text style={styles.preferenceTitle}>Biometric Login</Text>
              <Text style={styles.preferenceSubtitle}>Use fingerprint or face ID</Text>
            </View>
            <View style={styles.toggle}>
              <View style={styles.toggleActive} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={togglePanel}
        >
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your account, preferences, and security settings</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'account' && styles.activeTab]}
          onPress={() => setActiveTab('account')}
        >
          <Text style={[styles.tabText, activeTab === 'account' && styles.activeTabText]}>
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'premium' && styles.activeTab]}
          onPress={() => setActiveTab('premium')}
        >
          <Text style={[styles.tabText, activeTab === 'premium' && styles.activeTabText]}>
            Premium
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'preferences' && styles.activeTab]}
          onPress={() => setActiveTab('preferences')}
        >
          <Text style={[styles.tabText, activeTab === 'preferences' && styles.activeTabText]}>
            Preferences
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'account' && renderAccountTab()}
      {activeTab === 'premium' && renderPremiumTab()}
      {activeTab === 'preferences' && renderPreferencesTab()}
    </View>
  );
}

