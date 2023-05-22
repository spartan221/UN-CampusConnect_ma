import React, { useCallback, useContext } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { getMyInfo, signin } from '../GraphQL';
import { UserContext } from '../utilities/UserContext';
import { emailPattern } from '../utilities/patterns';
import { screens, validationMessages } from '../utilities/constants';
import { manageError } from '../utilities/errors';
import { storeToken } from '../utilities/jwt';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%',
        overflow: 'scroll'
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
    textError: {
        color: 'red',
    }
});

export default Authentication = (props) => {

    // Properties
    const { navigation } = props;

    const [user, setUser] = useContext(UserContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: 'somaso1219@glumark.com',
            password: 'password',
        },
    });


    const onSubmit = useCallback((data) => {
        const { email, password } = data;
        signin(email, password)
            .then((token) => storeToken(token))
            .then(() => getMyInfo())
            .then((myInfo) => setUser(myInfo))
            .catch((error) => manageError(error));
    }, []);


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
                                required: {
                                    message: validationMessages.required,
                                    value: true
                                },
                                pattern: {
                                    message: validationMessages.email,
                                    value: emailPattern
                                }
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
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <Text>{message}</Text>}
                        />
                        <Controller
                            control={control}
                            rules={{
                                required: {
                                    message: validationMessages.required,
                                    value: true
                                },
                                minLength: {
                                    message: validationMessages.password,
                                    value: 8
                                }
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
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => <Text>{message}</Text>}
                        />
                        <Button title="Iniciar sesión" onPress={handleSubmit(onSubmit)} />
                        <Button title="Registrarse" onPress={() => navigation.navigate(screens.signup)} />
                    </View>
                </View>
            </View>
        </View>
    );
};
