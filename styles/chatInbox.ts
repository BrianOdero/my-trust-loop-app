import { StyleSheet } from 'react-native';
import { useTheme } from './theme';

export const chatInbox = () => {
  const theme = useTheme();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceSecondary,
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
    color: theme.colors.text,
  },
  chatStatus: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.background,
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
    backgroundColor: theme.colors.secondary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#2d2d2d',
    borderBottomLeftRadius: 4,
  },
  senderName: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: theme.colors.text,
  },
  otherMessageText: {
    color: theme.colors.text,
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
    color: theme.colors.textSecondary,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceSecondary,
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
    color: theme.colors.text,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#404040',
  },
  emojiButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.surfaceTertiary,
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
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  avatarText: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
})


