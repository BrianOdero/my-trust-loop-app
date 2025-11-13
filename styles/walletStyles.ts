import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const walletStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 12,
  },
  walletCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletLabel: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  walletDetails: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceTertiary,
    paddingTop: 16,
  },
  walletDetailLabel: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 4,
  },
  walletDetailValue: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  cardInfo: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardDetail: {
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  securityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityItemText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  securityItemArrow: {
    fontSize: 20,
    color: theme.colors.textTertiary,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
  },
  privacyItemText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceTertiary,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.text,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 8,
    fontWeight: '600',
  },
  pinInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
    textAlign: 'center',
    letterSpacing: 8,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  modalActions: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
  },
  modalButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextSecondary: {
    color: theme.colors.textTertiary,
  },
});

