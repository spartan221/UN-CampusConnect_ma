import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../utilities/constants';
import Authentication from '../screens/Authentication';
import Registration from '../screens/Registration';
import EmailConfirmationNavigation from './EmailConfirmationNavigation';

const Tab = createBottomTabNavigator();

const AuthenticationNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={screens.signip} screenOptions={{ tabBarHideOnKeyboard: true }}>
            <Tab.Screen name={screens.signip} component={Authentication} />
            <Tab.Screen name={screens.signup} component={Registration} />
            <Tab.Screen name={screens.emailConfirmationNavigator} component={EmailConfirmationNavigation} />
        </Tab.Navigator>
    )
}

export default AuthenticationNavigator;