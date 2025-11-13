import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Users } from 'lucide-react-native';
import { AppContact } from '@/hooks/useContacts';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/providor/AuthProvidor';
import { groupCreationModalStyles } from '@/styles/styles';

interface GroupCreationModalProps {
  visible: boolean;
  onClose: () => void;
  selectedContacts: AppContact[];
  onGroupCreated: (groupId: string) => void;
}

export default function GroupCreationModal({
  visible,
  onClose,
  selectedContacts,
  onGroupCreated,
}: GroupCreationModalProps) {
  const [groupName, setGroupName] = useState('');
  const [creating, setCreating] = useState(false);
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const styles = groupCreationModalStyles;

  const createGroupChat = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a group');
      return;
    }

    if (!groupName.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    if (selectedContacts.length === 0) {
      Alert.alert('Error', 'Please select at least one contact');
      return;
    }

    try {
      setCreating(true);
      console.log('Starting group creation...');

      // 1. Create group chat room
      const { data: chatRoom, error: roomError } = await supabase
        .from('chat_rooms')
        .insert({
          name: groupName.trim(),
          type: 'group',
          created_by: user.id,
          last_message: `Group "${groupName.trim()}" created`,
          last_message_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (roomError) {
        console.error('Error creating chat room:', roomError);
        throw roomError;
      }

      console.log('Chat room created:', chatRoom.id);

      // 2. Add current user as admin
      const { error: adminError } = await supabase
        .from('chat_room_members')
        .insert({
          chat_room_id: chatRoom.id,
          user_id: user.id,
          role: 'admin',
        });

      if (adminError) {
        console.error('Error adding admin:', adminError);
        throw adminError;
      }

      // 3. Add selected contacts as members
      const memberInserts = selectedContacts.map(contact => {
        if (!contact.userId) {
          console.warn('Skipping contact without userId:', contact.name);
          return Promise.resolve();
        }
        
        return supabase
          .from('chat_room_members')
          .insert({
            chat_room_id: chatRoom.id,
            user_id: contact.userId,
            role: 'member',
          });
      });

      // Wait for all member inserts to complete
      const memberResults = await Promise.all(memberInserts);
      
      // Check for errors in member inserts
      const memberErrors = memberResults.filter(result => result.error);
      if (memberErrors.length > 0) {
        console.error('Errors adding members:', memberErrors);
        // Continue anyway, as some members might have been added successfully
      }

      // 4. Send welcome message
      const { error: messageError } = await supabase
        .from('messages')
        .insert({
          chat_room_id: chatRoom.id,
          sender_id: user.id,
          content: `Created the group "${groupName.trim()}"`,
          message_type: 'system',
          read_by: [user.id],
        });

      if (messageError) {
        console.error('Error sending welcome message:', messageError);
        // Continue anyway, as the group was created successfully
      }

      console.log('Group created successfully with ID:', chatRoom.id);
      Alert.alert('Success', 'Group created successfully!');
      onGroupCreated(chatRoom.id);

    } catch (error: any) {
      console.error('Error creating group:', error);
      Alert.alert('Error', error.message || 'Failed to create group');
    } finally {
      setCreating(false);
    }
  };

  const handleClose = () => {
    setGroupName('');
    setCreating(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} disabled={creating}>
            <X color="#9ca3af" size={24} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Create Group</Text>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
          {/* Group Name Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Group Name
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter group name..."
              placeholderTextColor="#6b7280"
              value={groupName}
              onChangeText={setGroupName}
              editable={!creating}
            />
          </View>

          {/* Selected Contacts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Members ({selectedContacts.length + 1})
            </Text>
            
            {/* Current user */}
            <View style={[styles.memberCard, styles.currentUserCard]}>
              <View style={[styles.memberAvatar, styles.currentUserAvatar]}>
                <Text style={styles.memberAvatarText}>
                  You
                </Text>
              </View>
              <Text style={styles.memberName}>You (Admin)</Text>
            </View>

            {/* Selected contacts */}
            {selectedContacts.map(contact => (
              <View
                key={contact.id}
                style={[styles.memberCard, styles.contactCard]}
              >
                <View style={[styles.memberAvatar, styles.contactAvatar]}>
                  {contact.avatar ? (
                    <Image
                      source={{ uri: contact.avatar }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  ) : (
                    <Text style={styles.memberAvatarText}>
                      {contact.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </Text>
                  )}
                </View>
                
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>
                    {contact.name}
                  </Text>
                  <Text style={styles.memberPhone}>
                    {contact.phoneNumbers[0]}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Create Button */}
        <View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
          <TouchableOpacity
            style={[
              styles.createButton,
              (!groupName.trim() || creating) && styles.createButtonDisabled
            ]}
            onPress={createGroupChat}
            disabled={!groupName.trim() || creating}
          >
            {creating ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Users color="white" size={20} style={{ marginRight: 8 }} />
            )}
            <Text style={styles.createButtonText}>
              {creating ? 'Creating...' : 'Create Group'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}