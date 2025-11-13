import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const portfolioStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  summaryCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  gainLossContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gainLossText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  gainLossPercent: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  totalInvested: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  periodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.surfaceSecondary,
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: theme.colors.primary,
  },
  periodText: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  selectedPeriodText: {
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  investmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  investmentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  investmentCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  investmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  investmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 2,
  },
  investmentType: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  investmentValues: {
    alignItems: 'flex-end',
  },
  currentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  changePercent: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  investmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceTertiary,
  },
  investedAmount: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  lastUpdated: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
});

