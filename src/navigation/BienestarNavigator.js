import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../utilities/constants';
import CreatePublication from '../screens/CreatePublication';
import ShowPublications from '../screens/ShowPublications';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BienestarNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={screens.createPublication}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: '#20403a' },
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name={screens.createPublication}
        component={CreatePublication}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="publish" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.showPublications}
        component={ShowPublications}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-agenda" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BienestarNavigator;
