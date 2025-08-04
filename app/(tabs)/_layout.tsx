import { Tabs } from 'expo-router';
import { Chrome as HomeIcon, Calculator as CalculatorIcon } from 'lucide-react-native';

const tabBarStyle = {
  backgroundColor: '#ffffff',
  borderTopWidth: 1,
  borderTopColor: '#e5e5e5',
  height: 80,
  paddingBottom: 20,
  paddingTop: 10,
};

const tabBarLabelStyle = {
  fontSize: 12,
  fontWeight: '600',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarLabelStyle,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <HomeIcon size={size} color={color} accessibilityLabel="Home tab icon" />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ size, color }) => (
            <CalculatorIcon size={size} color={color} accessibilityLabel="Calculator tab icon" />
          ),
        }}
      />
    </Tabs>
  );
}
