import LottieView from 'lottie-react-native';
import { useState, useRef, useEffect } from "react";
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { loginSignupStyles } from "@/styles/styles";
import { supabase } from "@/utils/supabase";

export default function VerifyOTP() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  
  const styles = loginSignupStyles();
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const focusNextInput = (index: number) => {
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = numericText;
      setOtp(newOtp);

      // Auto-focus next input
      if (numericText.length === 1 && index < 5) {
        focusNextInput(index);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      focusPreviousInput(index);
    }
  };

// In verify-otp.tsx - Enhanced createUserProfile function
  const createUserProfile = async (userId: string) => {
    try {
      console.log('Creating profile for user:', userId);
      
      // First check if profile already exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      // If profile doesn't exist, create it
      if (checkError && checkError.code === 'PGRST116') {
        const displayName = `User ${phone?.substring(phone.length - 8)}` || 'User';
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            display_name: displayName,
            phone_number: phone,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          return false;
        }

        // Create AI chat room for the user
        const { data: chatRoom, error: chatError } = await supabase
          .from('chat_rooms')
          .insert({
            name: 'TrustLoop Assistant',
            type: 'ai',
            created_by: userId,
          })
          .select()
          .single();

        if (chatError) {
          console.error('Error creating AI chat room:', chatError);
          return true; // Profile was created, so return true anyway
        }

        // Add user to AI chat
        await supabase
          .from('chat_room_members')
          .insert({
            chat_room_id: chatRoom.id,
            user_id: userId,
            role: 'member'
          });

        // Create AI session
        await supabase
          .from('ai_sessions')
          .insert({
            user_id: userId,
            chat_room_id: chatRoom.id,
            context: {}
          });

        return true;
      } else if (existingProfile) {
        // Update existing profile with phone number
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            phone_number: phone,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (updateError) {
          console.error('Error updating profile:', updateError);
          return false;
        }
        return true;
      }

      return true;
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      return false;
    }
  };


const verifyOTP = async () => {
  const otpString = otp.join('');
  
  if (otpString.length !== 6) {
    Alert.alert("Error", "Please enter the complete 6-digit OTP");
    return;
  }

  setLoading(true);
  
  try {
    console.log('Verifying OTP for phone:', phone, 'OTP:', otpString);
    
    // Use the exact same phone format that was used in signInWithOtp
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone!,
      token: otpString,
      type: 'sms'
    });

    if (error) {
      console.error('OTP verification error:', error);
      
      if (error.message.includes('invalid_otp')) {
        Alert.alert("Error", "Invalid OTP code. Please check and try again.");
        // Clear OTP for retry
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else if (error.message.includes('expired')) {
        Alert.alert("Error", "OTP has expired. Please request a new code.");
        setOtp(['', '', '', '', '', '']);
      } else {
        Alert.alert("Error", error.message);
      }
      
      setLoading(false);
      return;
    }

    console.log('OTP verified successfully:', JSON.stringify(data, null, 2));

    // Get the current session to verify
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('No session created after OTP verification');
    }

    console.log('Session created:', session);

    // Handle user profile creation
    if (data.user) {
      const profileSuccess = await createUserProfile(data.user.id);
      
      if (!profileSuccess) {
        console.warn('Profile creation failed, but user is authenticated');
        // Continue anyway since auth succeeded
      }

      Alert.alert("Success", "Phone number verified successfully!");
      
      // Use replace to prevent going back to OTP screen
      router.replace('(auth)/(main)/(tabs)/dashboard');
    }
    
  } catch (error: any) {
    console.error('OTP verification exception:', error);
    Alert.alert("Error", "Failed to verify OTP. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const resendOTP = async () => {
    setResendLoading(true);
    
    try {
      console.log('Resending OTP to:', phone);
      
      const { error } = await supabase.auth.signInWithOtp({
        phone: phone!,
      });

      if (error) {
        console.error('Resend OTP error:', error);
        Alert.alert("Error", error.message || "Failed to resend OTP");
      } else {
        Alert.alert("Success", "OTP sent again!");
        setCountdown(60);
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      console.error('Resend OTP exception:', error);
      Alert.alert("Error", "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#0f0f0f'}}>
        <ActivityIndicator size={"large"} color="#10b981"/>
        <Text style={{color: '#ffffff', marginTop: 16}}>Verifying OTP...</Text>
      </View>
    );
  }

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
                style={{width: "auto", height: 200, marginVertical: 5}} 
              />
              
              <Text style={styles.headerText}>VERIFY OTP</Text>
              <Text style={styles.subHeaderText}>
                Enter the 6-digit code sent to{"\n"}
                <Text style={{fontWeight: 'bold', color: '#10b981'}}>{phone}</Text>
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={ref => inputRefs.current[index] = ref}
                    style={[
                      styles.otpInput,
                      digit !== '' && styles.otpInputFilled
                    ]}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>

              <TouchableOpacity 
                onPress={verifyOTP} 
                style={[
                  styles.submitButton, 
                  otp.join('').length !== 6 && styles.submitButtonDisabled
                ]} 
                disabled={otp.join('').length !== 6 || loading}
              >
                <View style={styles.submitButtonInner}>
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.submitButtonText}>Verify OTP</Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn't receive the code?{' '}
                </Text>
                <TouchableOpacity 
                  onPress={resendOTP} 
                  disabled={countdown > 0 || resendLoading}
                >
                  <Text style={[
                    styles.resendButtonText,
                    (countdown > 0 || resendLoading) && styles.resendButtonTextDisabled
                  ]}>
                    {resendLoading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                onPress={() => router.back()} 
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>
                  ← Back to Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}