import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, Search, User, UserPlus, Check } from 'lucide-react-native';
import { AppContact } from '@/hooks/useContacts';
import { contactSelectionModalStyles } from '@/styles/styles';

interface ContactSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onContactsSelected: (selectedContacts: AppContact[]) => void;
  mode: 'individual' | 'group';
  existingMembers?: string[];
  registeredContacts: AppContact[]; // Add this prop
  loading: boolean; // Add this prop
  refreshContacts: () => Promise<void>; // Add this prop
}

export default function ContactSelectionModal({
  visible,
  onClose,
  onContactsSelected,
  mode,
  existingMembers = [],
  registeredContacts, // Receive from parent
  loading, // Receive from parent
  refreshContacts, // Receive from parent
}: ContactSelectionModalProps) {
  const [selectedContacts, setSelectedContacts] = useState<AppContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const styles = contactSelectionModalStyles;

  // Refresh contacts when modal becomes visible
  useEffect(() => {
    if (visible) {
      handleRefresh();
    }
  }, [visible]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshContacts();
    setRefreshing(false);
  };

  const filteredContacts = registeredContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumbers.some(phone => 
      phone.includes(searchQuery.replace(/[^0-9+]/g, ''))
    )
  );

  const toggleContactSelection = (contact: AppContact) => {
    if (mode === 'individual') {
      setSelectedContacts([contact]);
    } else {
      const isSelected = selectedContacts.some(c => c.id === contact.id);
      if (isSelected) {
        setSelectedContacts(prev => prev.filter(c => c.id !== contact.id));
      } else {
        setSelectedContacts(prev => [...prev, contact]);
      }
    }
  };

  const handleConfirmSelection = () => {
    if (selectedContacts.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one contact.');
      return;
    }

    if (mode === 'individual' && selectedContacts.length > 1) {
      Alert.alert('Invalid Selection', 'Please select only one contact for individual chat.');
      return;
    }

    onContactsSelected(selectedContacts);
    setSelectedContacts([]);
    setSearchQuery('');
  };

  const handleClose = () => {
    setSelectedContacts([]);
    setSearchQuery('');
    onClose();
  };

  const renderContactItem = ({ item }: { item: AppContact }) => {
    const isSelected = selectedContacts.some(c => c.id === item.id);
    const isAlreadyMember = existingMembers.includes(item.userId!);

    return (
      <TouchableOpacity
        style={[
          styles.contactItem,
          isSelected ? styles.contactItemSelected : styles.contactItemNormal
        ]}
        onPress={() => !isAlreadyMember && toggleContactSelection(item)}
        disabled={isAlreadyMember}
      >
        <View style={styles.contactAvatar}>
          {item.avatar ? (
            <Image
              source={{ uri: item.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          ) : (
            <Text style={styles.contactAvatarText}>
              {item.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </Text>
          )}
        </View>

        <View style={styles.contactInfo}>
          <Text style={[
            styles.contactName,
            isAlreadyMember ? styles.contactNameDisabled : styles.contactNameNormal
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.contactPhone,
            isAlreadyMember ? styles.contactPhoneDisabled : styles.contactPhoneNormal
          ]}>
            {item.phoneNumbers[0]}
          </Text>
        </View>

        {isAlreadyMember ? (
          <Text style={styles.alreadyMemberText}>Already in chat</Text>
        ) : isSelected ? (
          <View style={styles.selectionIndicator}>
            <Check color="white" size={16} />
          </View>
        ) : (
          <View style={styles.unselectedIndicator} />
        )}
      </TouchableOpacity>
    );
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
          <TouchableOpacity onPress={handleClose}>
            <X color="#9ca3af" size={24} />
          </TouchableOpacity>

          <Text style={styles.headerText}>
            {mode === 'individual' ? 'Select Contact' : 'Select Contacts'}
          </Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color="#9ca3af" size={20} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 12,
              fontSize: 16,
              color: '#ffffff',
            }}
            placeholder="Search contacts..."
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Selected Contacts Count */}
        {mode === 'group' && selectedContacts.length > 0 && (
          <View style={styles.selectedContactsHeader}>
            <Text style={styles.selectedContactsText}>
              {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''} selected
            </Text>
          </View>
        )}

        {/* Contacts List */}
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: '#0f0f0f' }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              {loading || refreshing ? (
                <>
                  <ActivityIndicator size="large" color="#6b7280" />
                  <Text style={[styles.emptyStateText, styles.emptyStateTextPrimary]}>
                    Loading contacts...
                  </Text>
                </>
              ) : (
                <>
                  <UserPlus color="#6b7280" size={48} />
                  <Text style={[styles.emptyStateText, styles.emptyStateTextPrimary]}>
                    No registered contacts found
                  </Text>
                  <Text style={[styles.emptyStateText, styles.emptyStateTextSecondary]}>
                    Only contacts who use TrustLoop will appear here
                  </Text>
                  <TouchableOpacity onPress={handleRefresh} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          }
        />

        {/* Footer */}
        <View style={[styles.footer, { paddingBottom: 16 + insets.bottom }]}>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              selectedContacts.length === 0 && styles.confirmButtonDisabled
            ]}
            onPress={handleConfirmSelection}
            disabled={selectedContacts.length === 0}
          >
            <Text style={[
              styles.confirmButtonText,
              selectedContacts.length === 0 && styles.confirmButtonTextDisabled
            ]}>
              {mode === 'individual' ? 'Start Chat' : `Create Group (${selectedContacts.length})`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}