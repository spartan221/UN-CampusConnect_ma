import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screens } from '../utilities/constants';
import CreatePublication from '../screens/CreatePublication';
import ShowPublications from '../screens/ShowPublications';
import ShowPublicationById from '../screens/ShowPublicationById';


const Tab = createBottomTabNavigator();

const BienestarNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={screens.createPublication} screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
            <Tab.Screen name={screens.createPublication} component={CreatePublication} />
            <Tab.Screen name={screens.showPublications} component={ShowPublications} />
            <Tab.Screen name={screens.showPublicationById} component={ShowPublicationById} />
        </Tab.Navigator>
    )
}

export default BienestarNavigator;