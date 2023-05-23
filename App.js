import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './src/utilities/UserContext';

import { getMyInfo } from './src/GraphQL';
import { getToken } from './src/utilities/jwt';
import { alertWindow } from './src/utilities/alert';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './src/navigation/AuthenticationNavigator';
import MainNavigator from './src/navigation/MainNavigator';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
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

    return (
        <SafeAreaView style={styles.wrapper}>
            <UserContext.Provider value={[user, setUser]}>
                <NavigationContainer>
                    {
                        user
                            ?
                            <MainNavigator />
                            :
                            <AuthenticationNavigator />
                    }
                </NavigationContainer>
            </UserContext.Provider>
        </SafeAreaView >
    )
};