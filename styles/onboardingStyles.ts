import { StyleSheet } from 'react-native';
import { useTheme } from './theme';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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

