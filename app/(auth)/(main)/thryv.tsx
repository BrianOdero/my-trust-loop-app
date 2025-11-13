import { useSidePanel } from '@/contexts/sidepanelcontext';
import { thryvStyles } from '@/styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Interface for savings programs
 */
interface SavingsProgram {
  id: string;
  title: string;
  description: string;
  minAmount: number;
  targetAmount: number;
  duration: string;
  participants: number;
  interestRate: number;
  category: 'emergency' | 'business' | 'education' | 'housing';
}

/**
 * Interface for training programs
 */
interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: number;
  category: 'financial' | 'business' | 'digital' | 'vocational';
  nextSession: string;
}

/**
 * Interface for business opportunities
 */
interface BusinessOpportunity {
  id: string;
  title: string;
  description: string;
  type: 'market' | 'supplier' | 'buyer' | 'partnership';
  location: string;
  potential: string;
}

/**
 * Thryv - Women's Financial Inclusion & Empowerment Platform
 * 
 * Based on research for women in informal sector:
 * - Micro-savings with flexible contributions
 * - Financial literacy and business training
 * - Peer support and mentorship
 * - Market linkages and business opportunities
 * - Digital skills for online business
 * - Emergency funds and insurance
 */
export default function ThryvScreen() {
  const insets = useSafeAreaInsets();
  const { togglePanel } = useSidePanel();
  const styles = thryvStyles()
  
  const [activeTab, setActiveTab] = useState<'savings' | 'training' | 'business' | 'community'>('savings');

  // Realistic savings programs for informal sector women
  const savingsPrograms: SavingsProgram[] = [
    {
      id: '1',
      title: 'Emergency Safety Net',
      description: 'Build a 3-month emergency fund. Save as little as KES 50/day. Access funds within 24 hours when needed.',
      minAmount: 50,
      targetAmount: 15000,
      duration: '6 months',
      participants: 4521,
      interestRate: 5,
      category: 'emergency',
    },
    {
      id: '2',
      title: 'Business Booster',
      description: 'Grow your business capital. Save for inventory, equipment, or expansion. Get matched with micro-loans.',
      minAmount: 100,
      targetAmount: 50000,
      duration: '12 months',
      participants: 2847,
      interestRate: 8,
      category: 'business',
    },
    {
      id: '3',
      title: 'School Fees Saver',
      description: 'Never miss school fees payment. Automated savings for your children\'s education with bonus rewards.',
      minAmount: 200,
      targetAmount: 30000,
      duration: '9 months',
      participants: 5632,
      interestRate: 6,
      category: 'education',
    },
    {
      id: '4',
      title: 'Home Ownership Dream',
      description: 'Start your journey to owning land or a home. Group savings with land buying cooperatives.',
      minAmount: 500,
      targetAmount: 200000,
      duration: '24 months',
      participants: 1234,
      interestRate: 10,
      category: 'housing',
    },
  ];

  // Practical training programs
  const trainingPrograms: TrainingProgram[] = [
    {
      id: '1',
      title: 'Money Management Basics',
      description: 'Learn budgeting, saving, and managing daily finances. Taught in Swahili and English.',
      duration: '2 weeks',
      level: 'beginner',
      enrolled: 3421,
      category: 'financial',
      nextSession: 'Mon, Dec 2',
    },
    {
      id: '2',
      title: 'Start & Grow Your Business',
      description: 'From idea to profit. Business planning, pricing, marketing, and customer service.',
      duration: '4 weeks',
      level: 'beginner',
      enrolled: 2156,
      category: 'business',
      nextSession: 'Wed, Dec 4',
    },
    {
      id: '3',
      title: 'Mobile Money & Digital Banking',
      description: 'Master M-Pesa, mobile banking, and online payments. Stay safe from fraud.',
      duration: '1 week',
      level: 'beginner',
      enrolled: 4892,
      category: 'digital',
      nextSession: 'Fri, Dec 6',
    },
    {
      id: '4',
      title: 'Online Selling & Social Media',
      description: 'Sell on WhatsApp, Facebook, Instagram. Take photos, write descriptions, handle orders.',
      duration: '3 weeks',
      level: 'intermediate',
      enrolled: 1876,
      category: 'digital',
      nextSession: 'Sat, Dec 7',
    },
    {
      id: '5',
      title: 'Tailoring & Fashion Business',
      description: 'Advanced sewing techniques, pattern making, and building a fashion business.',
      duration: '8 weeks',
      level: 'intermediate',
      enrolled: 892,
      category: 'vocational',
      nextSession: 'Mon, Dec 9',
    },
    {
      id: '6',
      title: 'Food Business & Catering',
      description: 'Food safety, costing, packaging, and growing your food business.',
      duration: '4 weeks',
      level: 'beginner',
      enrolled: 1543,
      category: 'vocational',
      nextSession: 'Tue, Dec 10',
    },
  ];

  // Real business opportunities
  const businessOpportunities: BusinessOpportunity[] = [
    {
      id: '1',
      title: 'Bulk Buyers for Vegetables',
      description: 'Hotels and restaurants looking for reliable vegetable suppliers. Weekly orders of KES 10,000+',
      type: 'buyer',
      location: 'Nairobi CBD',
      potential: 'KES 40,000/month',
    },
    {
      id: '2',
      title: 'School Uniform Tender',
      description: '5 schools need uniform suppliers. Opportunity for tailors and fabric sellers.',
      type: 'market',
      location: 'Kiambu County',
      potential: 'KES 200,000',
    },
    {
      id: '3',
      title: 'Wholesale Supplier Partnership',
      description: 'Get products at wholesale prices. Join group buying for better margins.',
      type: 'supplier',
      location: 'Gikomba Market',
      potential: '30% savings',
    },
    {
      id: '4',
      title: 'Catering Collective',
      description: 'Join women caterers serving corporate events. Share equipment and orders.',
      type: 'partnership',
      location: 'Westlands',
      potential: 'KES 50,000/event',
    },
  ];

  /**
   * Handles joining a savings program
   */
  const handleJoinProgram = (programId: string) => {
    const program = savingsPrograms.find(p => p.id === programId);
    Alert.alert(
      'Join Savings Program',
      `Start saving with "${program?.title}"?\n\nMinimum: KES ${program?.minAmount}/day\nTarget: KES ${program?.targetAmount}\n\nYou'll join ${program?.participants.toLocaleString()} other women!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Join Now', onPress: () => console.log(`Joined: ${programId}`) },
      ]
    );
  };

  /**
   * Handles enrolling in training
   */
  const handleEnrollTraining = (trainingId: string) => {
    const training = trainingPrograms.find(t => t.id === trainingId);
    Alert.alert(
      'Enroll in Training',
      `Enroll in "${training?.title}"?\n\nDuration: ${training?.duration}\nNext session: ${training?.nextSession}\n\nFREE for Thryv members!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Enroll Free', onPress: () => console.log(`Enrolled: ${trainingId}`) },
      ]
    );
  };

  /**
   * Handles expressing interest in business opportunity
   */
  const handleBusinessInterest = (opportunityId: string) => {
    const opportunity = businessOpportunities.find(o => o.id === opportunityId);
    Alert.alert(
      'Business Opportunity',
      `Interested in "${opportunity?.title}"?\n\nWe'll connect you with the right contacts and provide support.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'I\'m Interested', onPress: () => console.log(`Interest: ${opportunityId}`) },
      ]
    );
  };

  /**
   * Gets category color
   */
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return '#ef4444';
      case 'business': return '#10b981';
      case 'education': return '#3b82f6';
      case 'housing': return '#f59e0b';
      case 'financial': return '#8b5cf6';
      case 'digital': return '#06b6d4';
      case 'vocational': return '#ec4899';
      default: return '#6b7280';
    }
  };

  /**
   * Renders savings programs tab
   */
  const renderSavingsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#ec4899', '#be185d']}
        style={styles.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icons.Sparkles color="#ffffff" size={32} />
        <Text style={styles.heroTitle}>Save Your Way to Success</Text>
        <Text style={styles.heroSubtitle}>
          Join 14,234 women building financial security through flexible micro-savings
        </Text>
        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>KES 45M</Text>
            <Text style={styles.heroStatLabel}>Total Saved</Text>
          </View>
          <View style={styles.heroStat}>
            <Text style={styles.heroStatValue}>98%</Text>
            <Text style={styles.heroStatLabel}>Success Rate</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Savings Programs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💰 Savings Programs</Text>
        <Text style={styles.sectionSubtitle}>Choose a program that fits your goals and budget</Text>

        {savingsPrograms.map((program) => (
          <View key={program.id} style={styles.programCard}>
            <View style={styles.programHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(program.category) }]}>
                <Text style={styles.categoryText}>{program.category.toUpperCase()}</Text>
              </View>
              <View style={styles.programParticipants}>
                <Icons.Users color="#6b7280" size={16} />
                <Text style={styles.programParticipantsText}>
                  {program.participants.toLocaleString()}
                </Text>
              </View>
            </View>

            <Text style={styles.programTitle}>{program.title}</Text>
            <Text style={styles.programDescription}>{program.description}</Text>

            <View style={styles.programDetails}>
              <View style={styles.programDetail}>
                <Icons.PiggyBank color="#10b981" size={16} />
                <Text style={styles.programDetailText}>
                  KES {program.minAmount}/day minimum
                </Text>
              </View>
              <View style={styles.programDetail}>
                <Icons.Target color="#3b82f6" size={16} />
                <Text style={styles.programDetailText}>
                  Target: KES {program.targetAmount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.programDetail}>
                <Icons.Clock color="#f59e0b" size={16} />
                <Text style={styles.programDetailText}>
                  {program.duration}
                </Text>
              </View>
              <View style={styles.programDetail}>
                <Icons.TrendingUp color="#10b981" size={16} />
                <Text style={styles.programDetailText}>
                  {program.interestRate}% interest
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.programButton}
              onPress={() => handleJoinProgram(program.id)}
            >
              <Text style={styles.programButtonText}>Join Program</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  /**
   * Renders training programs tab
   */
  const renderTrainingTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 Free Training Programs</Text>
        <Text style={styles.sectionSubtitle}>
          Learn new skills to grow your income. All classes are FREE for Thryv members!
        </Text>

        {trainingPrograms.map((training) => (
          <View key={training.id} style={styles.trainingCard}>
            <View style={styles.trainingHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(training.category) }]}>
                <Text style={styles.categoryText}>{training.category.toUpperCase()}</Text>
              </View>
              <View style={styles.trainingLevel}>
                <Icons.GraduationCap color="#6b7280" size={16} />
                <Text style={styles.trainingLevelText}>{training.level}</Text>
              </View>
            </View>

            <Text style={styles.trainingTitle}>{training.title}</Text>
            <Text style={styles.trainingDescription}>{training.description}</Text>

            <View style={styles.trainingMeta}>
              <View style={styles.trainingMetaItem}>
                <Icons.Calendar color="#10b981" size={16} />
                <Text style={styles.trainingMetaText}>Next: {training.nextSession}</Text>
              </View>
              <View style={styles.trainingMetaItem}>
                <Icons.Clock color="#6b7280" size={16} />
                <Text style={styles.trainingMetaText}>{training.duration}</Text>
              </View>
              <View style={styles.trainingMetaItem}>
                <Icons.Users color="#6b7280" size={16} />
                <Text style={styles.trainingMetaText}>
                  {training.enrolled.toLocaleString()} enrolled
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.trainingButton}
              onPress={() => handleEnrollTraining(training.id)}
            >
              <Icons.CheckCircle color="#ffffff" size={16} />
              <Text style={styles.trainingButtonText}>Enroll Free</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  /**
   * Renders business opportunities tab
   */
  const renderBusinessTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💼 Business Opportunities</Text>
        <Text style={styles.sectionSubtitle}>
          Real opportunities to grow your business and increase income
        </Text>

        {businessOpportunities.map((opportunity) => (
          <View key={opportunity.id} style={styles.opportunityCard}>
            <View style={styles.opportunityHeader}>
              <View style={styles.opportunityType}>
                {opportunity.type === 'buyer' && <Icons.ShoppingBag color="#10b981" size={20} />}
                {opportunity.type === 'market' && <Icons.Briefcase color="#3b82f6" size={20} />}
                {opportunity.type === 'supplier' && <Icons.DollarSign color="#f59e0b" size={20} />}
                {opportunity.type === 'partnership' && <Icons.Users color="#ec4899" size={20} />}
                <Text style={styles.opportunityTypeText}>{opportunity.type.toUpperCase()}</Text>
              </View>
              <View style={styles.opportunityPotential}>
                <Icons.Zap color="#fbbf24" size={16} />
                <Text style={styles.opportunityPotentialText}>{opportunity.potential}</Text>
              </View>
            </View>

            <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
            <Text style={styles.opportunityDescription}>{opportunity.description}</Text>

            <View style={styles.opportunityLocation}>
              <Text style={styles.opportunityLocationIcon}>📍</Text>
              <Text style={styles.opportunityLocationText}>{opportunity.location}</Text>
            </View>

            <TouchableOpacity
              style={styles.opportunityButton}
              onPress={() => handleBusinessInterest(opportunity.id)}
            >
              <Text style={styles.opportunityButtonText}>I'm Interested</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Success Stories */}
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>⭐ Success Stories</Text>
        <View style={styles.successCard}>
          <Text style={styles.successQuote}>
            "Through Thryv, I connected with a hotel that buys my vegetables every week. My income tripled!"
          </Text>
          <Text style={styles.successAuthor}>- Mary W., Vegetable Farmer, Kiambu</Text>
        </View>
        <View style={styles.successCard}>
          <Text style={styles.successQuote}>
            "The tailoring training and school uniform opportunity changed my life. I now employ 3 women!"
          </Text>
          <Text style={styles.successAuthor}>- Grace M., Tailor, Nairobi</Text>
        </View>
      </View>
    </ScrollView>
  );

  /**
   * Renders community tab
   */
  const renderCommunityTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>👭 Community Support</Text>
        <Text style={styles.sectionSubtitle}>
          Connect with other women, share experiences, and grow together
        </Text>

        {/* Peer Groups */}
        <View style={styles.communityCard}>
          <Icons.MessageCircle color="#ec4899" size={24} />
          <Text style={styles.communityCardTitle}>Peer Support Groups</Text>
          <Text style={styles.communityCardDescription}>
            Join WhatsApp groups with women in your area or business. Share tips, challenges, and celebrate wins.
          </Text>
          <TouchableOpacity style={styles.communityButton}>
            <Text style={styles.communityButtonText}>Find Your Group</Text>
          </TouchableOpacity>
        </View>

        {/* Mentorship */}
        <View style={styles.communityCard}>
          <Icons.Lightbulb color="#f59e0b" size={24} />
          <Text style={styles.communityCardTitle}>Mentorship Program</Text>
          <Text style={styles.communityCardDescription}>
            Get paired with successful businesswomen who guide you monthly. Free mentorship for all members.
          </Text>
          <TouchableOpacity style={styles.communityButton}>
            <Text style={styles.communityButtonText}>Request Mentor</Text>
          </TouchableOpacity>
        </View>

        {/* Community Impact */}
        <View style={styles.impactSection}>
          <Text style={styles.impactTitle}>💝 Our Impact Together</Text>
          <View style={styles.impactStats}>
            <View style={styles.impactStat}>
              <Icons.Heart color="#ec4899" size={32} />
              <Text style={styles.impactStatValue}>14,234</Text>
              <Text style={styles.impactStatLabel}>Women Empowered</Text>
            </View>
            <View style={styles.impactStat}>
              <Icons.Award color="#fbbf24" size={32} />
              <Text style={styles.impactStatValue}>8,921</Text>
              <Text style={styles.impactStatLabel}>Businesses Started</Text>
            </View>
            <View style={styles.impactStat}>
              <Icons.Star color="#10b981" size={32} />
              <Text style={styles.impactStatValue}>KES 45M</Text>
              <Text style={styles.impactStatLabel}>Total Saved</Text>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 What Women Say</Text>
          <View style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <View style={styles.testimonialAvatar}>
                <Text style={styles.testimonialAvatarText}>A</Text>
              </View>
              <View>
                <Text style={styles.testimonialName}>Amina K.</Text>
                <Text style={styles.testimonialRole}>Market Vendor</Text>
              </View>
            </View>
            <Text style={styles.testimonialText}>
              "Thryv taught me to save daily. Now I have emergency money and my business is growing!"
            </Text>
          </View>

          <View style={styles.testimonialCard}>
            <View style={styles.testimonialHeader}>
              <View style={styles.testimonialAvatar}>
                <Text style={styles.testimonialAvatarText}>J</Text>
              </View>
              <View>
                <Text style={styles.testimonialName}>Jane M.</Text>
                <Text style={styles.testimonialRole}>Food Vendor</Text>
              </View>
            </View>
            <Text style={styles.testimonialText}>
              "The free training on mobile money helped me start accepting M-Pesa. Sales increased 40%!"
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient
        colors={['#ec4899', '#be185d']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={togglePanel}
        >
          <Icons.Menu color="#ffffff" size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Thryv</Text>
          <Text style={styles.headerSubtitle}>Women's Financial Empowerment</Text>
        </View>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'savings' && styles.activeTab]}
          onPress={() => setActiveTab('savings')}
        >
          <Icons.PiggyBank color={activeTab === 'savings' ? '#ec4899' : '#6b7280'} size={18} />
          <Text style={[styles.tabText, activeTab === 'savings' && styles.activeTabText]}>
            Savings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'training' && styles.activeTab]}
          onPress={() => setActiveTab('training')}
        >
          <Icons.BookOpen color={activeTab === 'training' ? '#ec4899' : '#6b7280'} size={18} />
          <Text style={[styles.tabText, activeTab === 'training' && styles.activeTabText]}>
            Training
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'business' && styles.activeTab]}
          onPress={() => setActiveTab('business')}
        >
          <Icons.Briefcase color={activeTab === 'business' ? '#ec4899' : '#6b7280'} size={18} />
          <Text style={[styles.tabText, activeTab === 'business' && styles.activeTabText]}>
            Business
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'community' && styles.activeTab]}
          onPress={() => setActiveTab('community')}
        >
          <Icons.Users color={activeTab === 'community' ? '#ec4899' : '#6b7280'} size={18} />
          <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
            Community
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'savings' && renderSavingsTab()}
      {activeTab === 'training' && renderTrainingTab()}
      {activeTab === 'business' && renderBusinessTab()}
      {activeTab === 'community' && renderCommunityTab()}
    </View>
  );
}

