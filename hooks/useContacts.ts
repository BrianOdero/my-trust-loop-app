import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { Alert, Platform, Linking } from 'react-native';
import { supabase } from '@/utils/supabase';
import { useAuth } from '@/providor/AuthProvidor';
import { RefreshControl } from 'react-native';

export interface AppContact {
  id: string;
  name: string;
  phoneNumbers: string[];
  isRegistered: boolean;
  userId?: string;
  avatar?: string;
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<AppContact[]>([]);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Check current permission status
  const checkPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Contacts.getPermissionsAsync();
      console.log('Current contacts permission status:', status);
      
      if (status === 'granted') {
        setPermissionGranted(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking contacts permission:', error);
      return false;
    }
  };

  const debugContacts = () => {
    console.log('=== CONTACTS DEBUG INFO ===');
    console.log('Total contacts:', contacts.length);
    console.log('Registered contacts:', getRegisteredContacts().length);
    console.log('Registered contacts details:', getRegisteredContacts().map(c => ({
      name: c.name,
      phone: c.phoneNumbers[0],
      userId: c.userId,
      isRegistered: c.isRegistered
    })));
    console.log('Permission granted:', permissionGranted);
    console.log('Loading:', loading);
    console.log('Current user:', user?.id);
    console.log('==========================');
  };

  // Request contacts permission with better error handling
  const requestPermission = async (): Promise<boolean> => {
    try {
      console.log('Requesting contacts permission...');
      
      // First check if we already have permission
      const currentStatus = await checkPermission();
      if (currentStatus) {
        return true;
      }

      // Request permission
      const { status, canAskAgain } = await Contacts.requestPermissionsAsync();
      console.log('Permission request result:', { status, canAskAgain });

      if (status === 'granted') {
        setPermissionGranted(true);
        return true;
      } else {
        // Handle denied permission
        if (status === 'denied' && !canAskAgain) {
          // Permission permanently denied, guide user to settings
          Alert.alert(
            'Permission Required',
            'Contacts permission is required to find friends. Please enable it in Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              { 
                text: 'Open Settings', 
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:');
                  } else {
                    Linking.openSettings();
                  }
                }
              }
            ]
          );
        } else {
          // First time denial or temporary
          Alert.alert(
            'Permission Required',
            'Contacts permission is required to find friends on TrustLoop.',
            [{ text: 'OK' }]
          );
        }
        return false;
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      Alert.alert('Error', 'Failed to request contacts permission');
      return false;
    }
  };

  // Enhanced normalizePhoneNumber function in useContacts hook
  const normalizePhoneNumber = (phone: string): string => {
    if (!phone) return '';
    
    // Remove all non-digit characters except +
    let normalized = phone.replace(/[^\d+]/g, '');
    
    // Handle various phone number formats
    if (normalized.startsWith('0') && normalized.length === 10) {
      normalized = '+254' + normalized.substring(1); // Kenya format
    }
    
    // Ensure it starts with + for international format
    if (!normalized.startsWith('+')) {
      if (normalized.length === 9) {
        normalized = '+254' + normalized; // Kenya format
      } else if (normalized.length === 10 && normalized.startsWith('0')) {
        normalized = '+254' + normalized.substring(1); // Kenya format
      } else if (normalized.length === 11 && normalized.startsWith('1')) {
        normalized = '+' + normalized; // US format
      }
    }
    
    return normalized;
  };

  // Load and sync contacts
  const loadContacts = async (): Promise<AppContact[]> => {
    if (!user) {
      console.log('No user found, skipping contacts load');
      return [];
    }

    try {
      setLoading(true);
      console.log('Starting contacts load...');

      // Check permission first
      const hasPermission = await checkPermission();
      if (!hasPermission) {
        console.log('No contacts permission, skipping load');
        return [];
      }

      // Fetch contacts from device
      const { data: deviceContacts, error } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Image
        ],
        sort: Contacts.SortTypes.FirstName,
      });

      if (error) {
        console.error('Error fetching device contacts:', error);
        throw error;
      }

      console.log(`Found ${deviceContacts?.length || 0} device contacts`);

      if (!deviceContacts || deviceContacts.length === 0) {
        console.log('No contacts found on device');
        return [];
      }

      // Format contacts and normalize phone numbers
      const formattedContacts: AppContact[] = deviceContacts
        .filter(contact => {
          const hasName = contact.name && contact.name.trim().length > 0;
          const hasPhoneNumbers = contact.phoneNumbers && contact.phoneNumbers.length > 0;
          const isValid = hasName && hasPhoneNumbers;
          
          if (!isValid) {
            console.log('Skipping invalid contact:', contact.name);
          }
          
          return isValid;
        })
        .map(contact => {
          // Normalize all phone numbers for this contact
          const normalizedPhones = contact.phoneNumbers!
            .map(p => normalizePhoneNumber(p.number || ''))
            .filter(p => p.length > 5); // Filter out too short numbers

          return {
            id: contact.id,
            name: contact.name!,
            phoneNumbers: normalizedPhones,
            isRegistered: false,
            avatar: contact.image?.uri,
          };
        })
        .filter(contact => contact.phoneNumbers.length > 0); // Remove contacts with no valid phone numbers

      console.log(`Formatted ${formattedContacts.length} valid contacts`);

      // Get all unique normalized phone numbers from contacts
      const allPhoneNumbers = formattedContacts.flatMap(c => c.phoneNumbers);
      const uniquePhoneNumbers = [...new Set(allPhoneNumbers)];
      
      console.log(`Checking ${uniquePhoneNumbers.length} unique phone numbers for registration`);
      
      if (uniquePhoneNumbers.length > 0) {
        // Query profiles table for registered users with these phone numbers
        const { data: registeredUsers, error: userError } = await supabase
          .from('profiles')
          .select('id, display_name, phone_number, avatar_url')
          .in('phone_number', uniquePhoneNumbers)
          .neq('id', user.id); // Exclude current user

        if (userError) {
          console.error('Error checking registered users:', userError);
          throw userError;
        }

        console.log(`Found ${registeredUsers?.length || 0} registered users:`, 
          registeredUsers?.map(u => ({ name: u.display_name, phone: u.phone_number })));

        // Create a map for quick lookup by phone number
        const userByPhone = new Map();
        registeredUsers?.forEach(user => {
          if (user.phone_number) {
            userByPhone.set(user.phone_number, user);
          }
        });

        // Update contacts with registration status - PRESERVE DEVICE CONTACT NAMES
        const updatedContacts = formattedContacts.map(contact => {
          // Check if any of this contact's phone numbers match a registered user
          let registeredUser = null;
          for (const phone of contact.phoneNumbers) {
            registeredUser = userByPhone.get(phone);
            if (registeredUser) {
              console.log(`Matched contact ${contact.name} with user ${registeredUser.display_name} via phone ${phone}`);
              break;
            }
          }

          if (registeredUser) {
            return {
              ...contact,
              isRegistered: true,
              userId: registeredUser.id,
              // Keep the original device contact name - don't override with display_name
              name: contact.name, // This preserves the name as saved in device contacts
              avatar: registeredUser.avatar_url || contact.avatar,
            };
          }

          return {
            ...contact,
            isRegistered: false
          };
        });

        const registeredCount = updatedContacts.filter(c => c.isRegistered).length;
        console.log(`Total registered contacts found: ${registeredCount}`);

        setContacts(updatedContacts);
        return updatedContacts;
      }

      setContacts(formattedContacts);
      return formattedContacts;

    } catch (error) {
      console.error('Error loading contacts:', error);
      Alert.alert('Error', 'Failed to load contacts');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Refresh contacts
  const refreshContacts = async () => {
    return await loadContacts();
  };

  // Get registered contacts only
  const getRegisteredContacts = () => {
    return contacts.filter(contact => contact.isRegistered);
  };

  // Get non-registered contacts
  const getNonRegisteredContacts = () => {
    return contacts.filter(contact => !contact.isRegistered);
  };

  // Search contacts
  const searchContacts = (query: string) => {
    const searchTerm = query.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.phoneNumbers.some(phone => phone.includes(searchTerm))
    );
  };

  // Load contacts when permission is granted and user is available
  useEffect(() => {
    const initializeContacts = async () => {
      if (user) {
        const hasPermission = await checkPermission();
        if (hasPermission) {
          await loadContacts();
        }
      }
    };

    initializeContacts();
  }, [user]);

  return {
    contacts,
    registeredContacts: getRegisteredContacts(),
    nonRegisteredContacts: getNonRegisteredContacts(),
    loading,
    permissionGranted,
    requestPermission,
    refreshContacts,
    searchContacts,
    checkPermission,
    debugContacts
  };
};