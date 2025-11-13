import { withdrawalStyles } from '@/styles/styles';
import { Stack, useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Withdrawal {
  id: string;
  amount: number;
  group: string;
  requestDate: string;
  processedDate?: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  reason: string;
  method: 'mpesa' | 'bank' | 'cash';
  reference?: string;
}

const mockWithdrawals: Withdrawal[] = [
  {
    id: '1',
    amount: 25000,
    group: 'Family Savings Circle',
    requestDate: '2024-08-28T10:30:00Z',
    processedDate: '2024-08-28T14:15:00Z',
    status: 'completed',
    reason: 'Emergency medical expenses',
    method: 'mpesa',
    reference: 'MP240828001',
  },
  {
    id: '2',
    amount: 15000,
    group: 'Business Partners Fund',
    requestDate: '2024-08-27T16:20:00Z',
    status: 'approved',
    reason: 'Business expansion',
    method: 'bank',
  },
  {
    id: '3',
    amount: 8000,
    group: 'Community Development',
    requestDate: '2024-08-26T09:45:00Z',
    status: 'pending',
    reason: 'School fees payment',
    method: 'mpesa',
  },
  {
    id: '4',
    amount: 50000,
    group: 'Investment Group',
    requestDate: '2024-08-25T11:30:00Z',
    processedDate: '2024-08-25T15:45:00Z',
    status: 'rejected',
    reason: 'Investment opportunity',
    method: 'bank',
  },
];

export default function WithdrawalsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<'mpesa' | 'bank' | 'cash'>('mpesa');
  const insets = useSafeAreaInsets();

  const styles = withdrawalStyles()

  const filteredWithdrawals = mockWithdrawals.filter(withdrawal => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pending') return withdrawal.status === 'pending' || withdrawal.status === 'approved';
    if (activeFilter === 'completed') return withdrawal.status === 'completed';
    return true;
  });

  const totalWithdrawn = mockWithdrawals
    .filter(w => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingAmount = mockWithdrawals
    .filter(w => w.status === 'pending' || w.status === 'approved')
    .reduce((sum, w) => sum + w.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'approved': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Icons.CheckCircle color="#10b981" size={16} />;
      case 'approved': return <Icons.CheckCircle color="#3b82f6" size={16} />;
      case 'pending': return <Icons.Clock color="#f59e0b" size={16} />;
      case 'rejected': return <Icons.AlertCircle color="#ef4444" size={16} />;
      default: return <Icons.Clock color="#6b7280" size={16} />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mpesa': return <Icons.DollarSign color="#10b981" size={16} />;
      case 'bank': return <Icons.Banknote color="#3b82f6" size={16} />;
      case 'cash': return <Icons.DollarSign color="#f59e0b" size={16} />;
      default: return <Icons.DollarSign color="#6b7280" size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRequestWithdrawal = () => {
    if (!amount || !reason || !selectedGroup) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert(
      'Withdrawal Request Submitted',
      `Your withdrawal request for KES ${amount} has been submitted and is pending approval.`,
      [{ text: 'OK', onPress: () => setShowRequestModal(false) }]
    );
  };

  const renderWithdrawal = (withdrawal: Withdrawal) => (
    <TouchableOpacity key={withdrawal.id} style={styles.withdrawalCard}>
      <View style={styles.withdrawalHeader}>
        <View style={styles.withdrawalInfo}>
          <Text style={styles.withdrawalAmount}>
            KES {withdrawal.amount.toLocaleString()}
          </Text>
          <Text style={styles.withdrawalGroup}>{withdrawal.group}</Text>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(withdrawal.status)}
          <Text style={[styles.statusText, { color: getStatusColor(withdrawal.status) }]}>
            {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.withdrawalDetails}>
        <Text style={styles.withdrawalReason}>{withdrawal.reason}</Text>
        <View style={styles.withdrawalMeta}>
          <View style={styles.metaItem}>
            <Icons.Calendar color="#6b7280" size={14} />
            <Text style={styles.metaText}>
              Requested: {formatDate(withdrawal.requestDate)}
            </Text>
          </View>
          {withdrawal.processedDate && (
            <View style={styles.metaItem}>
              <Icons.CheckCircle color="#6b7280" size={14} />
              <Text style={styles.metaText}>
                Processed: {formatDate(withdrawal.processedDate)}
              </Text>
            </View>
          )}
          <View style={styles.metaItem}>
            {getMethodIcon(withdrawal.method)}
            <Text style={styles.metaText}>
              {withdrawal.method.toUpperCase()}
            </Text>
          </View>
        </View>
        {withdrawal.reference && (
          <Text style={styles.referenceText}>
            Reference: {withdrawal.reference}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Withdrawals',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Icons.Search color="#6b7280" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Icons.Filter color="#6b7280" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/notifications')}>
                <Icons.Bell color="#6b7280" size={20} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Icons.ArrowDownLeft color="#10b981" size={20} />
            <Text style={styles.summaryLabel}>Total Withdrawn</Text>
            <Text style={styles.summaryAmount}>KES {totalWithdrawn.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Icons.Clock color="#f59e0b" size={20} />
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={styles.summaryAmount}>KES {pendingAmount.toLocaleString()}</Text>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {(['all', 'pending', 'completed'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, activeFilter === filter && styles.activeFilterTab]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Withdrawals List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.withdrawalsHeader}>
            <Text style={styles.withdrawalsTitle}>Withdrawal History</Text>
          </View>
          
          {filteredWithdrawals.length > 0 ? (
            filteredWithdrawals.map(renderWithdrawal)
          ) : (
            <View style={styles.emptyState}>
              <Icons.ArrowDownLeft color="#6b7280" size={48} />
              <Text style={styles.emptyTitle}>No withdrawals found</Text>
              <Text style={styles.emptySubtitle}>
                Your withdrawal history will appear here
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Request Withdrawal Button */}
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={() => setShowRequestModal(true)}
        >
          <Text style={styles.requestButtonText}>Request Withdrawal</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

