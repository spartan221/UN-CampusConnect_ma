import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './src/utilities/UserContext';

import { getMyInfo } from './src/GraphQL';
import { alertWindow } from './src/utilities/alert';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './src/navigation/AuthenticationNavigator';
import MainNavigator from './src/navigation/MainNavigator';

import { NativeBaseProvider, extendTheme } from 'native-base';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

export default App = () => {

    const [user, setUser] = useState();

    const getUserInfoWithSavedToken = async () => {
        getMyInfo()
            .then((myInfo) => setUser(myInfo))
            .catch(() => alertWindow('Error', 'No se pudieron recuperar los datos', 'Aceptar'));
    }

    useEffect(() => {
        getUserInfoWithSavedToken();
    }, []);

    const newColorTheme = {
        brand: {
            900: '#8287af',
            800: '#7c83db',
            700: '#b3bef6',
        },
        tema: {
            50: '#20403a',
            100: '#61735a',
            200: '#20403a',
            300: '#20403a',
            400: '#20403a',
            500: '#20403a',
            600: '#20403a',
            700: '#20403a',
            800: '#20403a',
            900: '#20403a',
        },
    };
    const theme = extendTheme({ colors: newColorTheme });

    return (
        <NativeBaseProvider theme={theme}>
            <UserContext.Provider value={[user, setUser]}>
                <NavigationContainer>
                    {user ? <MainNavigator /> : <AuthenticationNavigator />}
                </NavigationContainer>
            </UserContext.Provider>
        </NativeBaseProvider>
    );
};
