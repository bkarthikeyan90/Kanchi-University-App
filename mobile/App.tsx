import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useAuthStore } from './store/authStore';

// Screens
import HomeScreen from './app/screens/HomeScreen';
import NewsScreen from './app/screens/NewsScreen';
import EventsScreen from './app/screens/EventsScreen';
import DepartmentsScreen from './app/screens/DepartmentsScreen';
import GalleryScreen from './app/screens/GalleryScreen';
import PlacementsScreen from './app/screens/PlacementsScreen';
import ExaminationsScreen from './app/screens/ExaminationsScreen';
import ContactScreen from './app/screens/ContactScreen';
import LoginScreen from './app/screens/LoginScreen';
import NewsDetailScreen from './app/screens/NewsDetailScreen';
import EventDetailScreen from './app/screens/EventDetailScreen';
import DepartmentDetailScreen from './app/screens/DepartmentDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Departments') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Departments" component={DepartmentsScreen} />
      <Tab.Screen name="More" component={ContactScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    
    // Request notification permissions
    Notifications.requestPermissionsAsync();
    
    // Register for push notifications
    registerForPushNotifications();
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo Push Token:', token);
      
      // Send token to backend
      // await apiService.updateFCMToken(token);
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="NewsDetail" 
              component={NewsDetailScreen}
              options={{ headerShown: true, title: 'News Details' }}
            />
            <Stack.Screen 
              name="EventDetail" 
              component={EventDetailScreen}
              options={{ headerShown: true, title: 'Event Details' }}
            />
            <Stack.Screen 
              name="DepartmentDetail" 
              component={DepartmentDetailScreen}
              options={{ headerShown: true, title: 'Department' }}
            />
            <Stack.Screen 
              name="Gallery" 
              component={GalleryScreen}
              options={{ headerShown: true, title: 'Gallery' }}
            />
            <Stack.Screen 
              name="Placements" 
              component={PlacementsScreen}
              options={{ headerShown: true, title: 'Placements' }}
            />
            <Stack.Screen 
              name="Examinations" 
              component={ExaminationsScreen}
              options={{ headerShown: true, title: 'Examinations' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

