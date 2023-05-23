import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../utilities/constants';
import EmailConfirmation from '../screens/EmailConfirmation';
import ResendEmailConfirmation from '../screens/ResendEmailConfirmation';


const Stack = createNativeStackNavigator();

const EmailConfirmationNavigation = () => {
    return (
        <Stack.Navigator initialRouteName={screens.emailConfirmation} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.emailConfirmation} component={EmailConfirmation} />
            <Stack.Screen name={screens.resendEmailConfirmation} component={ResendEmailConfirmation} />
        </Stack.Navigator>
    )
};


export default EmailConfirmationNavigation;