import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const groupCreationModalStyles = () => {
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: '#2d2d2d',
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  currentUserCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.surfaceSecondary,
  },
  contactCard: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.surfaceSecondary,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  currentUserAvatar: {
    backgroundColor: theme.colors.primary,
  },
  contactAvatar: {
    backgroundColor: theme.colors.secondary,
  },
  memberAvatarText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
  memberPhone: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceSecondary,
    backgroundColor: theme.colors.surface,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: theme.colors.surfaceTertiary,
  },
  createButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
};

// Chat Inbox Styles (if you have them)
