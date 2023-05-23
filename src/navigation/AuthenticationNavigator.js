import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../utilities/constants';
import Authentication from '../screens/Authentication';
import Registration from '../screens/Registration';
import EmailConfirmationNavigation from './EmailConfirmationNavigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AuthenticationNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={screens.signip}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: { backgroundColor: '#20403a' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#20403a' },
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name={screens.signip}
        component={Authentication}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.signup}
        component={Registration}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.emailConfirmationNavigator}
        component={EmailConfirmationNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticationNavigator;
