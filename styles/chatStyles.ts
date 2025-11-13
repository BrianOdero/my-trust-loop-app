import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const chatStyles = () => {
  const theme = useTheme();

  return  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#404040',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: theme.colors.text,
  },
  searchCancelButton: {
    paddingVertical: 8,
  },
  searchCancelText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2d2d2d',
  },
  activeFilterTab: {
    backgroundColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  activeFilterText: {
    color: theme.colors.text,
  },
  chatsContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollViewContent: {
    paddingVertical: 8,
    backgroundColor: theme.colors.background,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.background,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  botIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  botLabel: {
    color: '#a78bfa',
    fontSize: 14,
  },
  chatTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: 8,
  },
  // Empty State Styles
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: theme.colors.background,
  },
  emptyIconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  emptyIconDecoration: {
    position: 'absolute',
    top: 10,
    left: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  emptyStateActions: {
    width: '100%',
    gap: 12,
  },
  emptyActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  emptyIndividualButton: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  emptyGroupButton: {
    backgroundColor: '#064e3b',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  emptyActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  // Quick Actions Styles (only shown when there are chats)
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  groupAction: {
    backgroundColor: '#064e3b',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  individualAction: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
});

// Contact Selection Modal Styles
