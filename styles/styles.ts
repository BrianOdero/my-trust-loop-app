import { Dimensions, StyleSheet } from "react-native";
const {width, height } = Dimensions.get('window')

export const onboardingStyles = () => 
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff", 
        },
        onboardingTitle:{
            color: '#000000', 
            fontWeight: 'bold', 
            fontSize: 20, 
            textAlign: 'center', 
            marginBottom: 20,
        },
        lottieAnimation: {
            width: width*0.8,
            height: height*0.6
        },
        nextbutton:{
            paddingHorizontal: 20,
            borderBottomLeftRadius: "45%",
            borderTopLeftRadius: "45%",
            backgroundColor: "black",
            height: 70,
            width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        skipbutton:{
            paddingHorizontal: 20,
            borderBottomRightRadius: "45%",
            borderTopRightRadius: "45%",
            backgroundColor: "black",
            height: 70,
            width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        donebutton:{
            paddingHorizontal: 20,
            borderBottomLeftRadius: "45%",
            borderTopLeftRadius: "45%",
            backgroundColor: "black",
            height: 70,
            width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        onboardingButtonColor:{
            color: "white",
            fontWeight: "bold",
            fontSize: 16            
        }
    })

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

export const dashboardStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
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
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  welcomeContainer: {
    marginBottom: 24,
    minHeight: 60,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    lineHeight: 22,
  },
  cursor: {
    color: '#10b981',
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
    shadowColor: '#000',
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
    color: '#ffffff',
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
    color: '#94a3b8',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
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
    color: '#94a3b8',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 14,
    color: '#ffffff',
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
    backgroundColor: '#fbbf24',
    borderRadius: 4,
    marginRight: 8,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    letterSpacing: 1,
  },
  savingsCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
    marginLeft: 8,
    fontWeight: '600',
  },
  savingsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
    marginRight: 8,
  },
  paymentDate: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
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
    color: '#ffffff',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export const chatStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
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
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
  },
  searchCancelButton: {
    paddingVertical: 8,
  },
  searchCancelText: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '500',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2d2d2d',
  },
  activeFilterTab: {
    backgroundColor: '#10b981',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  chatsContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollViewContent: {
    paddingVertical: 8,
    backgroundColor: '#0f0f0f',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#0f0f0f',
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
    color: '#ffffff',
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
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#0f0f0f',
  },
  botIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
  },
  botLabel: {
    color: '#a78bfa',
    fontSize: 14,
  },
  chatTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#9ca3af',
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#ffffff',
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
    backgroundColor: '#0f0f0f',
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
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9ca3af',
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
    borderColor: '#3b82f6',
  },
  emptyGroupButton: {
    backgroundColor: '#064e3b',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  emptyActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Quick Actions Styles (only shown when there are chats)
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
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
    borderColor: '#10b981',
  },
  individualAction: {
    backgroundColor: '#1e3a5f',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

// Contact Selection Modal Styles
export const contactSelectionModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  selectedContactsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#1e3a5f',
    borderBottomWidth: 1,
    borderBottomColor: '#3b82f6',
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
    borderBottomColor: '#2a2a2a',
  },
  contactItemSelected: {
    backgroundColor: '#1e3a5f',
  },
  contactItemNormal: {
    backgroundColor: '#0f0f0f',
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactAvatarText: {
    color: 'white',
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
    color: '#ffffff',
  },
  contactNameDisabled: {
    color: '#6b7280',
  },
  contactPhone: {
    fontSize: 14,
  },
  contactPhoneNormal: {
    color: '#9ca3af',
  },
  contactPhoneDisabled: {
    color: '#6b7280',
  },
  alreadyMemberText: {
    color: '#6b7280',
    fontSize: 12,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
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
    borderTopColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#374151',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonTextDisabled: {
    color: '#9ca3af',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#0f0f0f',
  },
  emptyStateText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  emptyStateTextPrimary: {
    color: '#9ca3af',
  },
  emptyStateTextSecondary: {
    marginTop: 8,
    color: '#6b7280',
    fontSize: 14,
  },
});

// Group Creation Modal Styles
export const groupCreationModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#ffffff',
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
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
  },
  contactCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
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
    backgroundColor: '#10b981',
  },
  contactAvatar: {
    backgroundColor: '#3b82f6',
  },
  memberAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  memberPhone: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  createButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#374151',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Chat Inbox Styles (if you have them)
export const chatInbox = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  chatStatus: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 2,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#2d2d2d',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
  },
  userMessageTime: {
    color: '#bfdbfe',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#9ca3af',
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: '#ffffff',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#404040',
  },
  emojiButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#10b981',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#374151',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyAvatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
})


export const paymentsSTyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
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
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
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
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedGroupItem: {
    borderColor: '#10b981',
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
    color: '#ffffff',
  },
  paymentMethodsList: {
    gap: 12,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentMethod: {
    borderColor: '#10b981',
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
    color: '#ffffff',
    marginBottom: 2,
  },
  paymentMethodDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  amountInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#374151',
  },
  referenceInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 8,
  },
  cardInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#374151',
  },
  inputDescription: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  alternativeText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export const profileStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
  },
  profileCard: {
    backgroundColor: '#2a2a2a',
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
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a2a2a',
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#374151',
    borderRadius: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
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
    backgroundColor: '#10b981',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
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
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  infoList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
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
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  menuList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  menuContent: {
    flex: 1,
    marginLeft: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
  },
  premiumCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#6b7280',
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
    color: '#10b981',
    marginRight: 12,
  },
  premiumFeatureText: {
    fontSize: 16,
    color: '#ffffff',
  },
  upgradeButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
});

export const notificationStyle = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  markAllRead: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryContent: {
    marginLeft: 16,
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: '#10b981',
  },
  filterText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#10b981',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  unreadCard: {
    backgroundColor: '#2a2a2a',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export const portfolioStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  summaryCard: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 8,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  gainLossContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gainLossText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  gainLossPercent: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  totalInvested: {
    fontSize: 14,
    color: '#6b7280',
  },
  periodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: '#10b981',
  },
  periodText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  selectedPeriodText: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  investmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  investmentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  investmentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  investmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  investmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  investmentType: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  investmentValues: {
    alignItems: 'flex-end',
  },
  currentValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  changePercent: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  investmentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  investedAmount: {
    fontSize: 12,
    color: '#6b7280',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export const reportsStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  periodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: '#10b981',
  },
  periodText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  selectedPeriodText: {
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
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
    color: '#ffffff',
    marginBottom: 16,
  },
  viewAllButton: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  performanceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  performanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  performanceSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  performanceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  reportCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  reportDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  reportMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  reportPeriod: {
    fontSize: 12,
    color: '#6b7280',
  },
  exportOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  exportButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export const settingsStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
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
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
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
    backgroundColor: '#10b981',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#ffffff',
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
    color: '#ffffff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  infoList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 4,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  infoInput: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#10b981',
    paddingVertical: 4,
  },
  saveButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  securityList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 4,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  securityContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
  },
  plansContainer: {
    gap: 16,
  },
  planCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  popularPlan: {
    borderColor: '#10b981',
    backgroundColor: '#10b98110',
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10b981',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  planHeader: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  planPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPriceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  planPricePeriod: {
    fontSize: 16,
    color: '#6b7280',
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
    color: '#ffffff',
    marginLeft: 12,
  },
  planButton: {
    backgroundColor: '#374151',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  popularPlanButton: {
    backgroundColor: '#10b981',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  popularPlanButtonText: {
    color: '#ffffff',
  },
  preferencesList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 4,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  preferenceContent: {
    flex: 1,
    marginLeft: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 2,
  },
  preferenceValue: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },
  preferenceSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export const thryvStyles = () =>
     StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
  },
  headerSpacer: {
    width: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
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
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6b7280',
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
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#ffffff',
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
    color: '#ffffff',
  },
  heroStatLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  programCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
    fontWeight: 'bold',
  },
  programParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  programParticipantsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  programDescription: {
    fontSize: 14,
    color: '#9ca3af',
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
    color: '#d1d5db',
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
    color: '#ffffff',
  },
  trainingCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#6b7280',
    textTransform: 'capitalize',
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  trainingDescription: {
    fontSize: 14,
    color: '#9ca3af',
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
    color: '#9ca3af',
  },
  trainingButton: {
    backgroundColor: '#10b981',
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
    color: '#ffffff',
  },
  opportunityCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
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
    color: '#fbbf24',
    fontWeight: 'bold',
  },
  opportunityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  opportunityDescription: {
    fontSize: 14,
    color: '#9ca3af',
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
    color: '#d1d5db',
  },
  opportunityButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  opportunityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  successCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  successQuote: {
    fontSize: 15,
    color: '#d1d5db',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 22,
  },
  successAuthor: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: '600',
  },
  communityCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  communityCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  communityCardDescription: {
    fontSize: 14,
    color: '#9ca3af',
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
    color: '#ffffff',
  },
  impactSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
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
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  impactStatLabel: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
  },
  testimonialCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  testimonialRole: {
    fontSize: 12,
    color: '#6b7280',
  },
  testimonialText: {
    fontSize: 14,
    color: '#d1d5db',
    lineHeight: 20,
  },
});

export const withdrawalStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: '#10b981',
  },
  filterText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#10b981',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  withdrawalsHeader: {
    marginBottom: 16,
  },
  withdrawalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  withdrawalCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  withdrawalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  withdrawalInfo: {
    flex: 1,
  },
  withdrawalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  withdrawalGroup: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  withdrawalDetails: {
    gap: 8,
  },
  withdrawalReason: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
  },
  withdrawalMeta: {
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
  },
  referenceText: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  requestButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  requestButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export const walletStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
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
    color: '#ffffff',
    marginLeft: 12,
  },
  walletCard: {
    backgroundColor: '#2a2a2a',
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
    color: '#6b7280',
    fontWeight: '600',
  },
  walletBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  walletDetails: {
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingTop: 16,
  },
  walletDetailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  walletDetailValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  cardInfo: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardDetail: {
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
  actionButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
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
    color: '#ffffff',
    marginLeft: 12,
  },
  securityItemArrow: {
    fontSize: 20,
    color: '#6b7280',
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  privacyItemText: {
    fontSize: 16,
    color: '#ffffff',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#10b981',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: '600',
  },
  pinInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#374151',
    textAlign: 'center',
    letterSpacing: 8,
  },
  textInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#374151',
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
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextSecondary: {
    color: '#6b7280',
  },
});

export const helpStyles = () =>
    StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  selectedCategoryChip: {
    backgroundColor: '#10b981',
  },
  categoryText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  faqContainer: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    borderRadius: 16,
  },
  faqItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginTop: 12,
  },
  contactContainer: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    borderRadius: 16,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  resourceContainer: {
    backgroundColor: '#2a2a2a',
    marginHorizontal: 20,
    borderRadius: 16,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  resourceSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});