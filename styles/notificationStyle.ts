import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const notificationStyle = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  markAllRead: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryContent: {
    marginLeft: 16,
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
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
  notificationCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  notificationMessage: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    lineHeight: 20,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
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
});

