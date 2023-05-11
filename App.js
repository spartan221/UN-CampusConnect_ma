import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from './src/components/Authentication';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
});

export default App = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <Authentication />
        </SafeAreaView >
    )
};