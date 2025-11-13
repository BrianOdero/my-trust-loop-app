import { helpStyles } from '@/styles/styles';
import { Stack } from 'expo-router';
import {
  Book,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Video,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ContactMethod {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action: () => void;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I join a savings group?',
    answer: 'To join a savings group, go to the Groups tab and tap "Join Group". You can browse available groups or use an invitation code from a group admin. Once you request to join, the group admin will review and approve your membership.',
    category: 'Groups',
  },
  {
    id: '2',
    question: 'How do I make a contribution payment?',
    answer: 'You can make payments through the Payments tab. Select "Quick Pay" or choose a specific group contribution. We support M-Pesa, bank transfers, and card payments. All payments are processed securely.',
    category: 'Payments',
  },
  {
    id: '3',
    question: 'What happens if I miss a payment?',
    answer: 'If you miss a payment, you\'ll receive notifications and may incur a small late fee as determined by your group rules. Contact your group admin to discuss payment arrangements. Consistent missed payments may affect your group membership.',
    category: 'Payments',
  },
  {
    id: '4',
    question: 'How do I apply for a loan?',
    answer: 'Go to the side menu and select "Apply for Loan". Fill out the application form with your loan amount, purpose, and personal details. Loan approval depends on your savings history, group membership, and creditworthiness.',
    category: 'Loans',
  },
  {
    id: '5',
    question: 'Is my money safe with TrustSave?',
    answer: 'Yes, your money is secure. We use bank-level encryption, are regulated by financial authorities, and partner with licensed financial institutions. Your savings are protected and insured up to the regulatory limits.',
    category: 'Security',
  },
  {
    id: '6',
    question: 'How do I withdraw my savings?',
    answer: 'Withdrawals depend on your group\'s rules and cycle. Most groups allow withdrawals at the end of a savings cycle or in emergencies. Go to the Withdrawals section in the side menu to request a withdrawal.',
    category: 'Withdrawals',
  },
  {
    id: '7',
    question: 'Can I be in multiple savings groups?',
    answer: 'Yes, you can join multiple savings groups. Each group operates independently with its own contribution schedule, rules, and payout structure. Manage all your groups from the Groups tab.',
    category: 'Groups',
  },
  {
    id: '8',
    question: 'How do I reset my PIN?',
    answer: 'Go to Settings > Security > Change PIN. You\'ll need to verify your identity using biometrics or answer security questions. If you\'re completely locked out, contact our support team for assistance.',
    category: 'Account',
  },
];

const categories = ['All', 'Groups', 'Payments', 'Loans', 'Security', 'Withdrawals', 'Account'];

export default function HelpScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const styles = helpStyles()

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactMethods: ContactMethod[] = [
    {
      id: 'phone',
      title: 'Call Us',
      subtitle: '+254 700 123 456',
      icon: <Phone color="#10b981" size={20} />,
      action: () => Linking.openURL('tel:+254700123456'),
    },
    {
      id: 'email',
      title: 'Email Support',
      subtitle: 'support@trustsave.co.ke',
      icon: <Mail color="#3b82f6" size={20} />,
      action: () => Linking.openURL('mailto:support@trustsave.co.ke'),
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Chat with us on WhatsApp',
      icon: <MessageCircle color="#25d366" size={20} />,
      action: () => Linking.openURL('https://wa.me/254700123456'),
    },
  ];

  const resources = [
    {
      id: 'user-guide',
      title: 'User Guide',
      subtitle: 'Complete guide to using TrustSave',
      icon: <Book color="#6b7280" size={20} />,
      action: () => console.log('Open user guide'),
    },
    {
      id: 'video-tutorials',
      title: 'Video Tutorials',
      subtitle: 'Watch step-by-step tutorials',
      icon: <Video color="#6b7280" size={20} />,
      action: () => console.log('Open video tutorials'),
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      subtitle: 'Read our terms of service',
      icon: <FileText color="#6b7280" size={20} />,
      action: () => console.log('Open terms'),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      subtitle: 'How we protect your data',
      icon: <FileText color="#6b7280" size={20} />,
      action: () => console.log('Open privacy policy'),
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const renderFAQ = (faq: FAQ) => {
    const isExpanded = expandedFAQ === faq.id;
    
    return (
      <TouchableOpacity
        key={faq.id}
        style={styles.faqItem}
        onPress={() => toggleFAQ(faq.id)}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          {isExpanded ? (
            <ChevronUp color="#6b7280" size={20} />
          ) : (
            <ChevronDown color="#6b7280" size={20} />
          )}
        </View>
        {isExpanded && (
          <Text style={styles.faqAnswer}>{faq.answer}</Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderContactMethod = (method: ContactMethod) => (
    <TouchableOpacity
      key={method.id}
      style={styles.contactMethod}
      onPress={method.action}
    >
      <View style={styles.contactIcon}>
        {method.icon}
      </View>
      <View style={styles.contactContent}>
        <Text style={styles.contactTitle}>{method.title}</Text>
        <Text style={styles.contactSubtitle}>{method.subtitle}</Text>
      </View>
      <ExternalLink color="#6b7280" size={16} />
    </TouchableOpacity>
  );

  const renderResource = (resource: any) => (
    <TouchableOpacity
      key={resource.id}
      style={styles.resourceItem}
      onPress={resource.action}
    >
      <View style={styles.resourceIcon}>
        {resource.icon}
      </View>
      <View style={styles.resourceContent}>
        <Text style={styles.resourceTitle}>{resource.title}</Text>
        <Text style={styles.resourceSubtitle}>{resource.subtitle}</Text>
      </View>
      <ExternalLink color="#6b7280" size={16} />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Help & Support',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <HelpCircle color="#10b981" size={32} />
            <Text style={styles.headerTitle}>How can we help you?</Text>
            <Text style={styles.headerSubtitle}>
              Find answers to common questions or get in touch with our support team
            </Text>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInput}>
              <Search color="#6b7280" size={20} />
              <TextInput
                style={styles.searchText}
                placeholder="Search for help..."
                placeholderTextColor="#6b7280"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedCategoryChip,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* FAQs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <View style={styles.faqContainer}>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map(renderFAQ)
              ) : (
                <View style={styles.emptyState}>
                  <HelpCircle color="#6b7280" size={48} />
                  <Text style={styles.emptyTitle}>No results found</Text>
                  <Text style={styles.emptySubtitle}>
                    Try adjusting your search or browse different categories
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Contact Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <View style={styles.contactContainer}>
              {contactMethods.map(renderContactMethod)}
            </View>
          </View>

          {/* Resources */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <View style={styles.resourceContainer}>
              {resources.map(renderResource)}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
