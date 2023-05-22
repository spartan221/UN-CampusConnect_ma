import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { screens } from '../utilities/constants';
import Home from '../screens/Home';
import BienestarNavigator from './BienestarNavigator';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={screens.bienestarNavigator}>
            {/* 
        TODO: Aquí van los componentes que pueden ser seleccionados
        cuando el usuario ya está autenticado, se acceden desde botones en el componente Home
        */}
            <Stack.Screen name={screens.home} component={Home} options={{ headerShown: false }} />
            <Stack.Screen name={screens.bienestarNavigator} component={BienestarNavigator} />
        </Stack.Navigator>
    )
}

export default MainNavigator;