import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { getMyInfo, signin } from '../GraphQL';
import { UserContext } from '../utilities/UserContext';
import { alertWindow } from '../utilities/alert';


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%',
    },
    formWrapper: {
        backgroundColor: '#ccc',
        flex: 1,
        padding: '10%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
    },
    loginIcon: {
        width: 200,
        height: 250,
        alignSelf: 'center',
        marginBottom: 20,
        borderRadius: 50,
    },
});

export default Authentication = () => {

    const [user, setUser] = useContext(UserContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const manageErrors = (errors) => {
        const error = errors[0];
        const errorMessage = error.description;
        alertWindow('¡Ha ocurrido un error!', errorMessage, 'Aceptar');
    };

    const onSubmit = (data) => {
        const { email, password } = data;
        signin(email, password)
            .then((token) => getMyInfo(token))
            .then((myInfo) => setUser(myInfo))
            .catch((errors) => manageErrors(errors));
    };

    return (
        <View style={styles.content}>
            <View style={styles.formWrapper}>
                <View style={styles.form}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.loginIcon}
                    />
                    <View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Correo Electrónico"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="email"
                        />
                        {errors.email && <Text>TODO: errores campo de email</Text>}

                        <Controller
                            control={control}
                            rules={{
                                required: true,
                                minLength: 8,
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    placeholder="Contraseña"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                            name="password"
                        />
                        {errors.password && <Text>TODO: Errores campo de contraseña</Text>}

                        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
                    </View>
                </View>
            </View>
        </View>
    );
};
