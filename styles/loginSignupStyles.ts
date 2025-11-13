import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const loginSignupStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0f0f0f',
  },
  authMethodToggle: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  authMethodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  authMethodButtonActive: {
    backgroundColor: '#10b981',
  },
  authMethodButtonText: {
    color: '#9ca3af',
    fontWeight: '600',
    fontSize: 14,
  },
  authMethodButtonTextActive: {
    color: '#ffffff',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ffffff',
  },
  phoneHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 8,
  },
  passwordToggle: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  passwordToggleText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    marginTop: 24,
    marginBottom: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#374151',
  },
  submitButtonInner: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  authMethodSwitch: {
    alignItems: 'center',
  },
  authMethodSwitchText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  link: {
    color: '#10b981',
    fontWeight: '600',
  },
  // OTP Specific Styles
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  otpInputFilled: {
    borderColor: '#10b981',
    backgroundColor: '#064e3b',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resendText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  resendButtonText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: '#6b7280',
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '500',
  },
});

