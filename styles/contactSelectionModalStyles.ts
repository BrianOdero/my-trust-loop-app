import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const contactSelectionModalStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
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
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
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
  selectedContactsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1e3a5f',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.secondary,
  },
  selectedContactsText: {
    color: '#bfdbfe',
    fontWeight: '500',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
  },
  contactItemSelected: {
    backgroundColor: '#1e3a5f',
  },
  contactItemNormal: {
    backgroundColor: theme.colors.background,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactAvatarText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactNameNormal: {
    color: theme.colors.text,
  },
  contactNameDisabled: {
    color: theme.colors.textTertiary,
  },
  contactPhone: {
    fontSize: 14,
  },
  contactPhoneNormal: {
    color: theme.colors.textSecondary,
  },
  contactPhoneDisabled: {
    color: theme.colors.textTertiary,
  },
  alreadyMemberText: {
    color: theme.colors.textTertiary,
    fontSize: 12,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unselectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#404040',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  confirmButton: {
    backgroundColor: theme.colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: theme.colors.surfaceTertiary,
  },
  confirmButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: theme.colors.textSecondary,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  emptyStateText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  emptyStateTextPrimary: {
    color: theme.colors.textSecondary,
  },
  emptyStateTextSecondary: {
    marginTop: 8,
    color: theme.colors.textTertiary,
    fontSize: 14,
  },
});
};

// Group Creation Modal Styles
