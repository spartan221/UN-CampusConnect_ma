import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './src/utilities/UserContext';

import Authentication from './src/screens/Authentication';
import Registration from './src/screens/Registration';
import EmailConfirmation from './src/screens/EmailConfirmation';
import ResendEmailConfirmation from './src/screens/ResendEmailConfirmation';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
});

export default App = () => {

    const [user, setUser] = useState();

    return (
        <SafeAreaView style={styles.wrapper}>
            <UserContext.Provider value={[user, setUser]}>
                <Text>{user && JSON.stringify(user)}</Text>
                <Registration />
            </UserContext.Provider>
        </SafeAreaView >
    )
};