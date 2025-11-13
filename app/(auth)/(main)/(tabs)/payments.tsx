
import { paymentsSTyles } from '@/styles/styles';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Menu,
  Phone,
  Smartphone,
  Users,
} from 'lucide-react-native';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Interface for payment group selection
 */
interface PaymentGroup {
  id: string;
  name: string;
  members: number;
}

/**
 * Interface for payment method options
 */
interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * Mock data for available groups to pay to
 */
const mockGroups: PaymentGroup[] = [
  {
    id: '1',
    name: 'Mama Mboga Chama',
    members: 8,
  },
  {
    id: '2',
    name: 'Diaspora Builders',
    members: 12,
  },
  {
    id: '3',
    name: 'Tech Savers',
    members: 15,
  },
];

/**
 * Available payment methods
 */
const paymentMethods: PaymentMethod[] = [
  {
    id: 'mpesa-stk',
    name: 'M-Pesa STK',
    description: 'M-Pesa PayBill',
    icon: <Smartphone color="#10b981" size={20} />,
  },
  {
    id: 'mpesa-push',
    name: 'M-Pesa STK Push',
    description: '',
    icon: <Phone color="#10b981" size={20} />,
  },
];

/**
 * Payments screen component that handles group payments with M-Pesa integration
 * Supports both STK Push and PayBill payment methods
 */
export default function PaymentsScreen() {
  const [selectedGroup, setSelectedGroup] = useState<PaymentGroup | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('mpesa-stk');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [amount, setAmount] = useState<string>('5000');
  const [reference, setReference] = useState<string>('');
  const [showCardForm, setShowCardForm] = useState<boolean>(false);
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  
  const styles = paymentsSTyles()
  
  const insets = useSafeAreaInsets();


  // Set default group selection
  useState(() => {
    if (mockGroups.length > 0) {
      setSelectedGroup(mockGroups[0]);
      setReference(mockGroups[0].name);
    }
  });

  /**
   * Handles M-Pesa STK Push payment processing
   */
  const handleSTKPush = () => {
    if (!phoneNumber || !amount || !selectedGroup) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    console.log('Processing STK Push:', {
      group: selectedGroup.name,
      phoneNumber,
      amount,
      reference
    });
    
    Alert.alert(
      'STK Push Sent',
      `M-Pesa payment request of KES ${amount} has been sent to ${phoneNumber} for ${selectedGroup.name}. Please check your phone and enter your M-Pesa PIN.`,
      [{ text: 'OK' }]
    );
  };

  /**
   * Handles card payment processing
   */
  const handleCardPayment = () => {
    if (!cardName || !cardNumber || !expiryDate || !cvv || !amount || !selectedGroup) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }
    
    console.log('Processing Card Payment:', {
      group: selectedGroup.name,
      cardNumber: cardNumber.slice(-4),
      amount
    });
    
    Alert.alert(
      'Payment Processing',
      `Processing card payment of KES ${amount} to ${selectedGroup.name}. This may take a few moments.`,
      [{ text: 'OK' }]
    );
  };

  /**
   * Renders the group selection interface
   */
  const renderGroupSelection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pay to</Text>
      <Text style={styles.sectionSubtitle}>
        {selectedGroup?.name || 'Select a group'}
      </Text>
      <Text style={styles.sectionDescription}>
        Your payment will be attributed to the selected group.
      </Text>
      
      <View style={styles.groupsList}>
        {mockGroups.map((group) => (
          <TouchableOpacity
            key={group.id}
            style={[
              styles.groupItem,
              selectedGroup?.id === group.id && styles.selectedGroupItem
            ]}
            onPress={() => {
              setSelectedGroup(group);
              setReference(group.name);
            }}
          >
            <View style={styles.groupInfo}>
              <Users color="#6b7280" size={16} />
              <Text style={styles.groupName}>{group.name}</Text>
            </View>
            {selectedGroup?.id === group.id && (
              <Check color="#10b981" size={20} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  /**
   * Renders payment method selection
   */
  const renderPaymentMethods = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Methods</Text>
      
      <View style={styles.paymentMethodsList}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethodItem,
              selectedPaymentMethod === method.id && styles.selectedPaymentMethod
            ]}
            onPress={() => {
              setSelectedPaymentMethod(method.id);
              setShowCardForm(method.id === 'card');
            }}
          >
            <View style={styles.paymentMethodInfo}>
              {method.icon}
              <View style={styles.paymentMethodText}>
                <Text style={styles.paymentMethodName}>{method.name}</Text>
                {method.description && (
                  <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                )}
              </View>
            </View>
            {selectedPaymentMethod === method.id && (
              <Check color="#10b981" size={20} />
            )}
          </TouchableOpacity>
        ))}
        
        {/* Card Payment Option */}
        <TouchableOpacity
          style={[
            styles.paymentMethodItem,
            selectedPaymentMethod === 'card' && styles.selectedPaymentMethod
          ]}
          onPress={() => {
            setSelectedPaymentMethod('card');
            setShowCardForm(true);
          }}
        >
          <View style={styles.paymentMethodInfo}>
            <CreditCard color="#3b82f6" size={20} />
            <View style={styles.paymentMethodText}>
              <Text style={styles.paymentMethodName}>Card</Text>
              <Text style={styles.paymentMethodDescription}>Bank Transfer</Text>
            </View>
          </View>
          {selectedPaymentMethod === 'card' && (
            <Check color="#10b981" size={20} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  /**
   * Renders M-Pesa payment form
   */
  const renderMpesaForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {selectedPaymentMethod === 'mpesa-push' ? 'M-Pesa STK Push' : 'Paying to: ' + selectedGroup?.name}
      </Text>
      
      {selectedPaymentMethod === 'mpesa-push' && (
        <Text style={styles.sectionDescription}>
          Enter your Safaricom number or Dial *334# to send and
          complete. You'll receive a prompt to authorize the
          payment.
        </Text>
      )}
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Phone (E.164)</Text>
        <View style={styles.inputContainer}>
          <Phone color="#6b7280" size={20} />
          <TextInput
            style={styles.textInput}
            placeholder="254700000000"
            placeholderTextColor="#6b7280"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Amount (KES)</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Reference (optional)</Text>
        <TextInput
          style={styles.referenceInput}
          value={reference}
          onChangeText={setReference}
          placeholder={selectedGroup?.name}
          placeholderTextColor="#6b7280"
        />
        <Text style={styles.inputDescription}>
          Secure. We only transmit balance, not your
          card details.
        </Text>
      </View>
      
      <TouchableOpacity style={styles.payButton} onPress={handleSTKPush}>
        <Check color="#ffffff" size={20} />
        <Text style={styles.payButtonText}>Send STK Push</Text>
      </TouchableOpacity>
      
      <Text style={styles.alternativeText}>Alternative: M-Pesa PayBill</Text>
    </View>
  );

  /**
   * Renders card payment form
   */
  const renderCardForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Card Payment</Text>
      <Text style={styles.sectionDescription}>
        Paying to: {selectedGroup?.name}
      </Text>
      <Text style={styles.sectionDescription}>
        Enter your card details to complete the payment. Your card
        details are secure and will not be stored.
      </Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Name on card</Text>
        <TextInput
          style={styles.cardInput}
          placeholder="Anthea Yusuf"
          placeholderTextColor="#6b7280"
          value={cardName}
          onChangeText={setCardName}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Card number</Text>
        <TextInput
          style={styles.cardInput}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="#6b7280"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />
      </View>
      
      <View style={styles.rowInputs}>
        <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.inputLabel}>Expiry (MM/YY)</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="08/27"
            placeholderTextColor="#6b7280"
            value={expiryDate}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.cardInput}
            placeholder="123"
            placeholderTextColor="#6b7280"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Amount (KES)</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderGroupSelection()}
        {renderPaymentMethods()}
        
        {selectedPaymentMethod !== 'card' && renderMpesaForm()}
        {showCardForm && renderCardForm()}
      </ScrollView>
    </View>
  );
}

