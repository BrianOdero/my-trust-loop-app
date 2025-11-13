import { useWallet } from '@/contexts/walletcontext';
import { walletStyles } from '@/styles/styles';
import {
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Settings,
  Shield,
  Smartphone,
  Wallet,
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Wallet settings component for managing individual wallet preferences and security
 * Integrated into user profile for centralized wallet management
 */
export default function WalletSettings() {
  const { individualWallet, isBalanceVisible, toggleBalanceVisibility, updateIndividualWallet } = useWallet();
  
  const [showPinModal, setShowPinModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newExpiryDate, setNewExpiryDate] = useState('');
  const [newCvv, setNewCvv] = useState('');

  const styles = walletStyles()

  /**
   * Handles PIN change process
   */
  const handlePinChange = () => {
    if (!currentPin || !newPin || !confirmPin) {
      Alert.alert('Error', 'Please fill in all PIN fields');
      return;
    }
    
    if (newPin !== confirmPin) {
      Alert.alert('Error', 'New PIN and confirmation do not match');
      return;
    }
    
    if (newPin.length !== 4) {
      Alert.alert('Error', 'PIN must be 4 digits');
      return;
    }
    
    Alert.alert(
      'PIN Changed',
      'Your wallet PIN has been successfully updated',
      [{ text: 'OK', onPress: () => {
        setShowPinModal(false);
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
      }}]
    );
  };

  /**
   * Handles card details update
   */
  const handleCardUpdate = () => {
    if (!newCardNumber || !newExpiryDate || !newCvv) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }
    
    updateIndividualWallet({
      cardNumber: newCardNumber,
      expiryDate: newExpiryDate,
      cvv: newCvv,
    });
    
    Alert.alert(
      'Card Updated',
      'Your card details have been successfully updated',
      [{ text: 'OK', onPress: () => {
        setShowCardModal(false);
        setNewCardNumber('');
        setNewExpiryDate('');
        setNewCvv('');
      }}]
    );
  };

  /**
   * Formats card number for display
   */
  const formatCardNumber = (cardNumber: string, isVisible: boolean) => {
    if (!isVisible) return '••••  ••••  ••••  ••••';
    return cardNumber;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Wallet Overview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Wallet color="#10b981" size={24} />
          <Text style={styles.sectionTitle}>Wallet Overview</Text>
        </View>
        
        <View style={styles.walletCard}>
          <View style={styles.walletHeader}>
            <Text style={styles.walletLabel}>Individual Wallet</Text>
            <TouchableOpacity onPress={toggleBalanceVisibility}>
              {isBalanceVisible ? (
                <Eye color="#6b7280" size={20} />
              ) : (
                <EyeOff color="#6b7280" size={20} />
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.walletBalance}>
            {isBalanceVisible ? `KES ${individualWallet.balance.toLocaleString()}` : '•••••��'}
          </Text>
          
          <View style={styles.walletDetails}>
            <Text style={styles.walletDetailLabel}>Account Number</Text>
            <Text style={styles.walletDetailValue}>
              {isBalanceVisible ? individualWallet.accountNumber : '••••••••••'}
            </Text>
          </View>
        </View>
      </View>

      {/* Card Management */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CreditCard color="#3b82f6" size={24} />
          <Text style={styles.sectionTitle}>Card Management</Text>
        </View>
        
        <View style={styles.cardInfo}>
          <View style={styles.cardDetail}>
            <Text style={styles.cardLabel}>Card Number</Text>
            <Text style={styles.cardValue}>
              {formatCardNumber(individualWallet.cardNumber, isBalanceVisible)}
            </Text>
          </View>
          
          <View style={styles.cardDetail}>
            <Text style={styles.cardLabel}>Expiry Date</Text>
            <Text style={styles.cardValue}>
              {isBalanceVisible ? individualWallet.expiryDate : '••/••'}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowCardModal(true)}
        >
          <Text style={styles.actionButtonText}>Update Card Details</Text>
        </TouchableOpacity>
      </View>

      {/* Security Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Shield color="#f59e0b" size={24} />
          <Text style={styles.sectionTitle}>Security</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.securityItem}
          onPress={() => setShowPinModal(true)}
        >
          <View style={styles.securityItemLeft}>
            <Lock color="#6b7280" size={20} />
            <Text style={styles.securityItemText}>Change Wallet PIN</Text>
          </View>
          <Text style={styles.securityItemArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.securityItem}>
          <View style={styles.securityItemLeft}>
            <Smartphone color="#6b7280" size={20} />
            <Text style={styles.securityItemText}>Two-Factor Authentication</Text>
          </View>
          <Text style={styles.securityItemArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Settings color="#6b7280" size={24} />
          <Text style={styles.sectionTitle}>Privacy</Text>
        </View>
        
        <View style={styles.privacyItem}>
          <Text style={styles.privacyItemText}>Hide Balance by Default</Text>
          <TouchableOpacity 
            style={[styles.toggle, !isBalanceVisible && styles.toggleActive]}
            onPress={toggleBalanceVisibility}
          >
            <View style={[styles.toggleThumb, !isBalanceVisible && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN Change Modal */}
      <Modal
        visible={showPinModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPinModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Wallet PIN</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current PIN</Text>
              <TextInput
                style={styles.pinInput}
                value={currentPin}
                onChangeText={setCurrentPin}
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
                placeholder="••••"
                placeholderTextColor="#6b7280"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New PIN</Text>
              <TextInput
                style={styles.pinInput}
                value={newPin}
                onChangeText={setNewPin}
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
                placeholder="••••"
                placeholderTextColor="#6b7280"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm New PIN</Text>
              <TextInput
                style={styles.pinInput}
                value={confirmPin}
                onChangeText={setConfirmPin}
                secureTextEntry
                keyboardType="numeric"
                maxLength={4}
                placeholder="••••"
                placeholderTextColor="#6b7280"
              />
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handlePinChange}
              >
                <Text style={styles.modalButtonText}>Update PIN</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setShowPinModal(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Card Update Modal */}
      <Modal
        visible={showCardModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Card Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.textInput}
                value={newCardNumber}
                onChangeText={setNewCardNumber}
                keyboardType="numeric"
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#6b7280"
              />
            </View>
            
            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.textInput}
                  value={newExpiryDate}
                  onChangeText={setNewExpiryDate}
                  placeholder="MM/YY"
                  placeholderTextColor="#6b7280"
                  maxLength={5}
                />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.textInput}
                  value={newCvv}
                  onChangeText={setNewCvv}
                  secureTextEntry
                  keyboardType="numeric"
                  placeholder="123"
                  placeholderTextColor="#6b7280"
                  maxLength={4}
                />
              </View>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleCardUpdate}
              >
                <Text style={styles.modalButtonText}>Update Card</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setShowCardModal(false)}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextSecondary]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

