import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const paymentsSTyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    lineHeight: 20,
    marginBottom: 16,
  },
  groupsList: {
    gap: 12,
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGroupItem: {
    borderColor: theme.colors.primary,
    backgroundColor: '#10b98110',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  paymentMethodsList: {
    gap: 12,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentMethod: {
    borderColor: theme.colors.primary,
    backgroundColor: '#10b98110',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentMethodText: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  amountInput: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
  },
  referenceInput: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
    marginBottom: 8,
  },
  cardInput: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.surfaceTertiary,
  },
  inputDescription: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    lineHeight: 16,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  alternativeText: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
});

