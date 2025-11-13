import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const withdrawalStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginTop: 8,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  activeFilterText: {
    color: theme.colors.primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  withdrawalsHeader: {
    marginBottom: 16,
  },
  withdrawalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  withdrawalCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  withdrawalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  withdrawalInfo: {
    flex: 1,
  },
  withdrawalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  withdrawalGroup: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  withdrawalDetails: {
    gap: 8,
  },
  withdrawalReason: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 8,
  },
  withdrawalMeta: {
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  referenceText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
  requestButton: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  requestButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});

