import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { screens } from '../utilities/constants';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator initialRouteName={screens.home} screenOptions={{ tabBarHideOnKeyboard: true }}>
            {/* 
        TODO: Aquí van los componentes que pueden ser seleccionados
        cuando el usuario ya está autenticado
        */}
            <Tab.Screen name={screens.home} component={Home} />
        </Tab.Navigator>
    )
}

export default MainNavigator;