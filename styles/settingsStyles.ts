import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const settingsStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textTertiary,
  },
  activeTabText: {
    color: theme.colors.text,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  infoList: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceTertiary,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  infoInput: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  securityList: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 4,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceTertiary,
  },
  securityContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.text,
    alignSelf: 'flex-end',
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  popularPlan: {
    borderColor: theme.colors.primary,
    backgroundColor: '#10b98110',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 4,
  },
  planHeader: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPriceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  planPricePeriod: {
    fontSize: 16,
    color: theme.colors.textTertiary,
    marginLeft: 4,
  },
  planFeatures: {
    marginBottom: 24,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planFeatureText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  planButton: {
    backgroundColor: theme.colors.surfaceTertiary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  popularPlanButton: {
    backgroundColor: theme.colors.primary,
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  popularPlanButtonText: {
    color: theme.colors.text,
  },
  preferencesList: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceTertiary,
  },
  preferenceContent: {
    flex: 1,
    marginLeft: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  preferenceValue: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  preferenceSubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
});

