import React, { useCallback, useContext } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { deleteToken } from "../utilities/jwt";
import { UserContext } from "../utilities/UserContext";
import { screens } from "../utilities/constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const Home = (props) => {

    // Properties
    const { navigation } = props;

    const [user, setUser] = useContext(UserContext);

    const manageLogOut = useCallback(async () => {
        await deleteToken();
        setUser(null);
    }, []);

    return (
        <View style={styles.container}>
            <Text>Estas en el home</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button title={'Cerrar Sesión'} onPress={manageLogOut} />
            <Button title={'Bienestar'} onPress={() => navigation.navigate(screens.bienestarNavigator)} />
            <Button title={'Convocatorias'} onPress={() => navigation.navigate(screens.calls)} />
            {user.role === 'tutor' && <Button title={screens.tutorProfile} onPress={() => navigation.navigate(screens.tutorProfile)} />}
            {user.role === 'admin' && <Button title={screens.callForm} onPress={() => navigation.navigate(screens.callForm)} />}
        </View>
    )

}

export default Home;