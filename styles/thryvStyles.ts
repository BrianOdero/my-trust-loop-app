import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const thryvStyles = () => {
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
    paddingVertical: 20,
  },
  menuButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.9,
  },
  headerSpacer: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceSecondary,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 4,
  },
  activeTab: {
    backgroundColor: theme.colors.text,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.textTertiary,
  },
  activeTabText: {
    color: '#ec4899',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 40,
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  heroStatLabel: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    marginBottom: 16,
    lineHeight: 20,
  },
  programCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 10,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  programParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  programParticipantsText: {
    fontSize: 14,
    color: theme.colors.textTertiary,
    fontWeight: '600',
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  programDetails: {
    gap: 8,
    marginBottom: 16,
  },
  programDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  programDetailText: {
    fontSize: 14,
    color: theme.colors.border,
  },
  programButton: {
    backgroundColor: '#ec4899',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  programButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  trainingCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trainingLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trainingLevelText: {
    fontSize: 12,
    color: theme.colors.textTertiary,
    textTransform: 'capitalize',
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  trainingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  trainingMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  trainingMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trainingMetaText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  trainingButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  trainingButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  opportunityCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  opportunityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  opportunityType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  opportunityTypeText: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  opportunityPotential: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fbbf2420',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  opportunityPotentialText: {
    fontSize: 12,
    color: theme.colors.warning,
    fontWeight: 'bold',
  },
  opportunityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  opportunityDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  opportunityLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  opportunityLocationIcon: {
    fontSize: 16,
  },
  opportunityLocationText: {
    fontSize: 14,
    color: theme.colors.border,
  },
  opportunityButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  opportunityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  successCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  successQuote: {
    fontSize: 15,
    color: theme.colors.border,
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 22,
  },
  successAuthor: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  communityCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  communityCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 12,
    marginBottom: 8,
  },
  communityCardDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  communityButton: {
    backgroundColor: '#ec4899',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  communityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  impactSection: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactStat: {
    alignItems: 'center',
  },
  impactStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  impactStatLabel: {
    fontSize: 11,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
  testimonialCard: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ec4899',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testimonialAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  testimonialRole: {
    fontSize: 12,
    color: theme.colors.textTertiary,
  },
  testimonialText: {
    fontSize: 14,
    color: theme.colors.border,
    lineHeight: 20,
  },
});

