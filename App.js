import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './src/utilities/UserContext';

import Authentication from './src/screens/Authentication';
import Registration from './src/screens/Registration';
import EmailConfirmation from './src/screens/EmailConfirmation';
import ResendEmailConfirmation from './src/screens/ResendEmailConfirmation';
import Home from './src/screens/Home';
import { getMyInfo } from './src/GraphQL';
import { getToken } from './src/utilities/jwt';
import { alertWindow } from './src/utilities/alert';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
});

export default App = () => {

    const [user, setUser] = useState();

    const getUserInfoWithSavedToken = async () => {
        const token = await getToken();
        if (token) {
            getMyInfo(token)
                .then((myInfo) => setUser(myInfo))
                .catch(() => alertWindow('Error', 'No se pudieron recuperar los datos', 'Aceptar'));
        };
    }

    useEffect(() => {
        getUserInfoWithSavedToken();
    }, []);

    return (
        <SafeAreaView style={styles.wrapper}>
            <UserContext.Provider value={[user, setUser]}>
                <Text>{user && JSON.stringify(user)}</Text>
                <ResendEmailConfirmation />
            </UserContext.Provider>
        </SafeAreaView >
    )
};