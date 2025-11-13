import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const dashboardStyles = () => {
  const theme = useTheme();

  return 
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'flex-start',
    position: 'relative',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: theme.colors.warning,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
  welcomeContainer: {
    marginBottom: 24,
    minHeight: 60,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  cursor: {
    color: theme.colors.primary,
    fontSize: 28,
    fontWeight: 'normal',
  },
  walletCardContainer: {
    marginBottom: 24,
  },
  walletCard: {
    borderRadius: 24,
    padding: 28,
    minHeight: 220,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 8,
  },
  visibilityToggle: {
    padding: 8,
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    letterSpacing: 1,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    width: 24,
    height: 18,
    backgroundColor: theme.colors.warning,
    borderRadius: 4,
    marginRight: 8,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  savingsCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  savingsLabel: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 8,
    fontWeight: '600',
  },
  savingsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentText: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginLeft: 6,
    marginRight: 8,
  },
  paymentDate: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.surfaceTertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 12,
    padding: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});

