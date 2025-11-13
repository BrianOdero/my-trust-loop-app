// @ts-nocheck
import { Tabs } from "expo-router";
import { CreditCard, Home, MessageCircle, User, Users } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#6b7280',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2a2a2a',
          borderTopColor: '#374151',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
          href: null
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Pay",
          tabBarIcon: ({ color, size }) => <CreditCard color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile Settings",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null,
          tabBarStyle: {display: 'none'},
        }}
      />
    </Tabs>
  );
}