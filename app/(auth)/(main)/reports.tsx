import { reportsStyles } from '@/styles/styles';
import { Stack } from 'expo-router';
import {
  Activity,
  BarChart3,
  DollarSign,
  Download,
  PieChart,
  Share,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ReportData {
  id: string;
  title: string;
  type: 'financial' | 'group' | 'investment' | 'loan';
  value: number;
  change: number;
  changePercent: number;
  period: string;
  description: string;
}

const mockReports: ReportData[] = [
  {
    id: '1',
    title: 'Total Savings',
    type: 'financial',
    value: 485000,
    change: 25000,
    changePercent: 5.4,
    period: 'This Month',
    description: 'Total amount saved across all groups',
  },
  {
    id: '2',
    title: 'Group Performance',
    type: 'group',
    value: 8,
    change: 2,
    changePercent: 33.3,
    period: 'Active Groups',
    description: 'Number of active savings groups',
  },
  {
    id: '3',
    title: 'Investment Returns',
    type: 'investment',
    value: 52800,
    change: 3200,
    changePercent: 6.4,
    period: 'This Quarter',
    description: 'Total returns from investments',
  },
  {
    id: '4',
    title: 'Loan Portfolio',
    type: 'loan',
    value: 125000,
    change: -15000,
    changePercent: -10.7,
    period: 'Outstanding',
    description: 'Total outstanding loan amount',
  },
];

interface QuickStat {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const quickStats: QuickStat[] = [
  {
    id: '1',
    label: 'Monthly Contributions',
    value: 'KES 45,000',
    icon: <DollarSign color="#10b981" size={20} />,
    color: '#10b981',
  },
  {
    id: '2',
    label: 'Group Members',
    value: '156',
    icon: <Users color="#3b82f6" size={20} />,
    color: '#3b82f6',
  },
  {
    id: '3',
    label: 'Success Rate',
    value: '94.2%',
    icon: <TrendingUp color="#f59e0b" size={20} />,
    color: '#f59e0b',
  },
  {
    id: '4',
    label: 'Avg. ROI',
    value: '12.5%',
    icon: <Activity color="#ef4444" size={20} />,
    color: '#ef4444',
  },
];

export default function ReportsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const insets = useSafeAreaInsets();

  const styles = reportsStyles()

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign color="#10b981" size={24} />;
      case 'group': return <Users color="#3b82f6" size={24} />;
      case 'investment': return <TrendingUp color="#f59e0b" size={24} />;
      case 'loan': return <BarChart3 color="#ef4444" size={24} />;
      default: return <BarChart3 color="#6b7280" size={24} />;
    }
  };

  const renderReport = (report: ReportData) => (
    <TouchableOpacity key={report.id} style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.reportIcon}>
          {getReportIcon(report.type)}
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{report.title}</Text>
          <Text style={styles.reportDescription}>{report.description}</Text>
        </View>
      </View>
      
      <View style={styles.reportMetrics}>
        <Text style={styles.reportValue}>
          {report.type === 'group' ? report.value : `KES ${report.value.toLocaleString()}`}
        </Text>
        <View style={styles.changeContainer}>
          {report.change >= 0 ? (
            <TrendingUp color="#10b981" size={16} />
          ) : (
            <TrendingDown color="#ef4444" size={16} />
          )}
          <Text style={[
            styles.changeText,
            { color: report.change >= 0 ? '#10b981' : '#ef4444' }
          ]}>
            {report.change >= 0 ? '+' : ''}{report.changePercent.toFixed(1)}%
          </Text>
        </View>
      </View>
      
      <Text style={styles.reportPeriod}>{report.period}</Text>
    </TouchableOpacity>
  );

  const renderQuickStat = (stat: QuickStat) => (
    <View key={stat.id} style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
        {stat.icon}
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Reports',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Download color="#6b7280" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Share color="#6b7280" size={20} />
              </TouchableOpacity>
            </View>
          ),
        }} 
      />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {(['week', 'month', 'quarter', 'year'] as const).map((period) => (
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
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Quick Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              {quickStats.map(renderQuickStat)}
            </View>
          </View>

          {/* Performance Overview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performance Overview</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View Chart</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.performanceCard}>
              <View style={styles.performanceHeader}>
                <PieChart color="#10b981" size={24} />
                <Text style={styles.performanceTitle}>Portfolio Summary</Text>
              </View>
              <Text style={styles.performanceValue}>KES 662,800</Text>
              <Text style={styles.performanceSubtitle}>Total Portfolio Value</Text>
              <View style={styles.performanceMetrics}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Savings</Text>
                  <Text style={styles.metricValue}>73%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Investments</Text>
                  <Text style={styles.metricValue}>19%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Loans</Text>
                  <Text style={styles.metricValue}>8%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Detailed Reports */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detailed Reports</Text>
            {mockReports.map(renderReport)}
          </View>

          {/* Export Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Export Reports</Text>
            <View style={styles.exportOptions}>
              <TouchableOpacity style={styles.exportButton}>
                <Download color="#10b981" size={20} />
                <Text style={styles.exportButtonText}>Download PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportButton}>
                <Share color="#3b82f6" size={20} />
                <Text style={styles.exportButtonText}>Share Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

