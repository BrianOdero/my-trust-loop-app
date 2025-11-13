import LottieView from 'lottie-react-native';
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginSignupStyles } from "@/styles/styles";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [name , setName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const styles = loginSignupStyles();
  const phoneRef = useRef<TextInput | null>(null);

  const loginWithPhone = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    setLoading(true);
    
    try {
      // Clean and format phone number properly
      const cleanedPhone = phoneNumber.trim().replace(/\s+/g, '');
      let formattedPhone = cleanedPhone;
      
      // Ensure it starts with +
      if (!cleanedPhone.startsWith('+')) {
        formattedPhone = `+${cleanedPhone}`;
      }

      console.log('Sending OTP to:', formattedPhone);

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          shouldCreateUser: true,
          data: {
            display_name: name
          }
        }
      });

      if (error) {
        console.error('Full error details:', JSON.stringify(error, null, 2));
        
        // More specific error messages
        if (error.message.includes('invalid_phone_number')) {
          Alert.alert("Error", "Please enter a valid phone number with country code (e.g., +1234567890)");
        } else if (error.message.includes('rate_limit')) {
          Alert.alert("Error", "Too many attempts. Please try again later.");
        } else {
          Alert.alert("Error", error.message);
        }
        
        setLoading(false);
        return;
      }

      console.log('OTP response:', JSON.stringify(data, null, 2));
      
      if (data) {
        Alert.alert("Success", "OTP sent successfully! Please check your messages.");
        // Navigate with the formatted phone number
        router.push({
          pathname: '/verify-otp',
          params: { 
            phone: formattedPhone 
          }
        });
      } else {
        Alert.alert("Error", "Failed to send OTP. Please try again.");
      }
      
    } catch (error: any) {
      console.error('Unexpected error:', error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    loginWithPhone();
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#0f0f0f'}}>
        <ActivityIndicator size={"large"} color="#10b981"/>
        <Text style={{color: '#ffffff', marginTop: 16}}>Sending OTP...</Text>
      </View>
    );
  }

  const canSubmit = () => {
    return phoneNumber.trim().length > 0;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#0f0f0f'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingBottom: 24}}
            keyboardShouldPersistTaps="handled"
            style={{backgroundColor: '#0f0f0f'}}
          >
            <View style={styles.container}>
              <LottieView 
                source={require("@/assets/animations/loginAnimation.json")} 
                autoPlay 
                loop
                style={{width: "auto", height: 250, marginVertical: 5}} 
              />
              
              <Text style={styles.headerText}>LOGIN WITH PHONE</Text>
              <Text style={styles.subHeaderText}>
                We'll send you an OTP to verify your number
              </Text>

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                placeholder="+1 234 567 8900"
                placeholderTextColor="#666"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.textInput}
                keyboardType="phone-pad"
                autoCapitalize="none"
                ref={phoneRef}
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
                autoFocus={true}
              />
              <Text style={styles.phoneHint}>
                Enter your number with country code (e.g., +1 for US, +44 for UK, +254 for Kenya)
              </Text>

              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                placeholder="Brian Odero"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
                style={styles.textInput}
                keyboardType="alphanumeric"
                autoCapitalize="none"
                ref={phoneRef}
                returnKeyType="go"
                onSubmitEditing={handleSubmit}
                autoFocus={true}
              />

              <TouchableOpacity 
                onPress={handleSubmit} 
                style={[
                  styles.submitButton, 
                  !canSubmit() && styles.submitButtonDisabled
                ]} 
                disabled={!canSubmit()}
              >
                <View style={styles.submitButtonInner}>
                  <Text style={styles.submitButtonText}>
                    Send OTP
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{marginTop: 20, alignItems: 'center'}}>
                <Text style={{color: '#6b7280', fontSize: 12, textAlign: 'center'}}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}