import { portfolioStyles } from '@/styles/styles';
import { Stack } from 'expo-router';
import {
  ArrowDownLeft,
  ArrowUpRight,
  DollarSign,
  PieChart,
  Target,
  TrendingDown,
  TrendingUp
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

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'mutual_funds' | 'savings';
  amount: number;
  currentValue: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Safaricom PLC',
    type: 'stocks',
    amount: 50000,
    currentValue: 58500,
    change: 8500,
    changePercent: 17.0,
    lastUpdated: '2024-08-28T10:30:00Z',
  },
  {
    id: '2',
    name: 'Government Bonds',
    type: 'bonds',
    amount: 100000,
    currentValue: 105200,
    change: 5200,
    changePercent: 5.2,
    lastUpdated: '2024-08-28T09:15:00Z',
  },
  {
    id: '3',
    name: 'Equity Bank Fund',
    type: 'mutual_funds',
    amount: 75000,
    currentValue: 72800,
    change: -2200,
    changePercent: -2.9,
    lastUpdated: '2024-08-28T11:45:00Z',
  },
  {
    id: '4',
    name: 'High Yield Savings',
    type: 'savings',
    amount: 200000,
    currentValue: 208000,
    change: 8000,
    changePercent: 4.0,
    lastUpdated: '2024-08-28T08:00:00Z',
  },
];

export default function PortfolioScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const insets = useSafeAreaInsets();
  const styles = portfolioStyles()

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = mockInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalGainLoss = totalCurrentValue - totalInvested;
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;

  const getInvestmentIcon = (type: string) => {
    switch (type) {
      case 'stocks': return <TrendingUp color="#10b981" size={20} />;
      case 'bonds': return <Target color="#3b82f6" size={20} />;
      case 'mutual_funds': return <PieChart color="#f59e0b" size={20} />;
      case 'savings': return <DollarSign color="#6b7280" size={20} />;
      default: return <DollarSign color="#6b7280" size={20} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderInvestment = (investment: Investment) => (
    <TouchableOpacity key={investment.id} style={styles.investmentCard}>
      <View style={styles.investmentHeader}>
        <View style={styles.investmentInfo}>
          <View style={styles.investmentIcon}>
            {getInvestmentIcon(investment.type)}
          </View>
          <View>
            <Text style={styles.investmentName}>{investment.name}</Text>
            <Text style={styles.investmentType}>
              {investment.type.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.investmentValues}>
          <Text style={styles.currentValue}>
            KES {investment.currentValue.toLocaleString()}
          </Text>
          <View style={styles.changeContainer}>
            {investment.change >= 0 ? (
              <ArrowUpRight color="#10b981" size={16} />
            ) : (
              <ArrowDownLeft color="#ef4444" size={16} />
            )}
            <Text style={[
              styles.changeText,
              { color: investment.change >= 0 ? '#10b981' : '#ef4444' }
            ]}>
              {investment.change >= 0 ? '+' : ''}KES {Math.abs(investment.change).toLocaleString()}
            </Text>
            <Text style={[
              styles.changePercent,
              { color: investment.change >= 0 ? '#10b981' : '#ef4444' }
            ]}>
              ({investment.changePercent >= 0 ? '+' : ''}{investment.changePercent.toFixed(1)}%)
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.investmentFooter}>
        <Text style={styles.investedAmount}>
          Invested: KES {investment.amount.toLocaleString()}
        </Text>
        <Text style={styles.lastUpdated}>
          Updated: {formatDate(investment.lastUpdated)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Portfolio',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Portfolio Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <PieChart color="#10b981" size={24} />
            <Text style={styles.summaryTitle}>Total Portfolio Value</Text>
          </View>
          <Text style={styles.totalValue}>
            KES {totalCurrentValue.toLocaleString()}
          </Text>
          <View style={styles.gainLossContainer}>
            {totalGainLoss >= 0 ? (
              <TrendingUp color="#10b981" size={20} />
            ) : (
              <TrendingDown color="#ef4444" size={20} />
            )}
            <Text style={[
              styles.gainLossText,
              { color: totalGainLoss >= 0 ? '#10b981' : '#ef4444' }
            ]}>
              {totalGainLoss >= 0 ? '+' : ''}KES {Math.abs(totalGainLoss).toLocaleString()}
            </Text>
            <Text style={[
              styles.gainLossPercent,
              { color: totalGainLoss >= 0 ? '#10b981' : '#ef4444' }
            ]}>
              ({totalGainLossPercent >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
            </Text>
          </View>
          <Text style={styles.totalInvested}>
            Total Invested: KES {totalInvested.toLocaleString()}
          </Text>
        </View>

        {/* Time Period Selector */}
        <View style={styles.periodContainer}>
          {(['1D', '1W', '1M', '3M', '1Y'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.selectedPeriodText,
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Investments List */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.investmentsHeader}>
            <Text style={styles.investmentsTitle}>Your Investments</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Investment</Text>
            </TouchableOpacity>
          </View>
          
          {mockInvestments.map(renderInvestment)}
        </ScrollView>
      </View>
    </>
  );
}

