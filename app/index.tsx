import { onboardingStyles } from "@/styles/styles";
import { onboardingStorage } from "@/utils/storage";
import { Link, useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import { Text, TouchableOpacity, View } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';

const styles = onboardingStyles();

// Pre-defined button components
const DoneButton = ({ ...props }) => (
  <TouchableOpacity style={styles.donebutton}>
    <Text style={styles.onboardingButtonColor} {...props}>Done</Text>
  </TouchableOpacity>
);

const SkipButton = ({ ...props }) => (
  <TouchableOpacity style={styles.skipbutton}>
    <Text style={styles.onboardingButtonColor} {...props}>Skip</Text>
  </TouchableOpacity>
);

const NextButton = ({ ...props }) => (
  <TouchableOpacity style={styles.nextbutton}>
    <Text style={styles.onboardingButtonColor} {...props}>Next</Text>
  </TouchableOpacity>
);

// Pre-defined animation components
const LoginAnimation = () => (
  <LottieView 
    autoPlay 
    style={styles.lottieAnimation} 
    source={require('@/assets/animations/loginAnimation.json')}
  />
);

const InsightsAnimation = () => (
  <LottieView 
    autoPlay 
    style={styles.lottieAnimation} 
    source={require('@/assets/animations/loginAnimation.json')}
  />
);

const ControlAnimation = () => (
  <LottieView 
    autoPlay 
    style={styles.lottieAnimation} 
    source={require('@/assets/animations/loginAnimation.json')}
  />
);

// Pre-computed onboarding pages configuration
const getOnboardingPages = (styles: any) => [
  {
    backgroundColor: "#FFFFFF",
    image: <LoginAnimation />,
    title: <Text style={styles.onboardingTitle}>WELCOME TO TRUST-LOOP</Text>,
    subtitle: 'Digitise your chama/rosca and manage group and personal savings in one place',
  },
  {
    backgroundColor: "#FFF4E6",
    image: <InsightsAnimation />,
    title: <Text style={styles.onboardingTitle}>GROW TOGETHER</Text>,
    subtitle: 'Build trusted saving circles, contribute transparently, and reach goals as a team',
  },
  {
    backgroundColor: "#E6F9FF",
    image: <ControlAnimation />,
    title: <Text style={styles.onboardingTitle}>STAY ON TRACK</Text>,
    subtitle: 'Automated cycles, reminders, and insights to help you grow financially',
  },
];

export default function OnboardingScreen() {
  const styles = onboardingStyles();
  const router = useRouter();

  const navigateToLogin = () => {
    // Set onboarding as completed
    onboardingStorage.set('onboarding', 'true');
    // Navigate to login
    router.replace('/loginSignup');
  };

  const onDone = () => {
    navigateToLogin();
  };

  const onSkip = () => {
    navigateToLogin();
  };

  const onboardingConfig = {
    bottomBarHeight: 80,
    DoneButtonComponent: DoneButton,
    SkipButtonComponent: SkipButton,
    NextButtonComponent: NextButton,
    bottomBarColor: "transparent" as const,
    bottomBarHighlight: false,
    onDone: onDone,
    onSkip: onSkip,
    pages: getOnboardingPages(styles),
  };

  return (
    <View style={styles.container}>
      <Onboarding {...onboardingConfig} />
    </View>
  );
}