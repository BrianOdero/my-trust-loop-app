import SidePanelContainer from "@/components/sidePanelcontainer";
import { SidePanelProvider } from "@/contexts/sidepanelcontext";
import { WalletProvider } from "@/contexts/walletcontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerBackTitle: "Back" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="thryv" options={{ headerShown: false }} />
        {/* <Stack.Screen name="loans" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="apply-loan" options={{ headerShown: false }} /> */}
        <Stack.Screen name="portfolio" />
        <Stack.Screen name="withdrawals" options={{ headerShown: false }} />
        <Stack.Screen name="reports" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="help" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack>
      <SidePanelContainer />
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <SidePanelProvider>
          <GestureHandlerRootView >
            <RootLayoutNav />
          </GestureHandlerRootView>
        </SidePanelProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
