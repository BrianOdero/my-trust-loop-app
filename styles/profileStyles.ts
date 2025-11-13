import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const profileStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
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
  settingsButton: {
    padding: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  profileCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surfaceSecondary,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    backgroundColor: theme.colors.surfaceTertiary,
    borderRadius: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceTertiary,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: theme.colors.surfaceTertiary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
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
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 16,
  },
  infoList: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceTertiary,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  menuList: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceTertiary,
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
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
  premiumCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  premiumHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
  },
  premiumFeatures: {
    width: '100%',
    marginBottom: 24,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  premiumFeatureIcon: {
    fontSize: 20,
    color: theme.colors.primary,
    marginRight: 12,
  },
  premiumFeatureText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  upgradeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceSecondary,
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginBottom: 32,
  },
});

