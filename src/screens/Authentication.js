import React, { useCallback, useContext } from 'react';
import { Text, View, StyleSheet, Button, TextInput, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { getMyInfo, signin } from '../GraphQL';
import { UserContext } from '../utilities/UserContext';
import { emailPattern } from '../utilities/patterns';
import { validationMessages } from '../utilities/constants';
import { manageError, manageFormFieldErrors } from '../utilities/errors';
import { storeToken } from '../utilities/jwt';

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
    textError: {
        color: 'red',
    }
});

export default Authentication = () => {

    const [user, setUser] = useContext(UserContext);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: 'imorales@unal.edu.co',
            password: 'qweqwe123',
        },
    });



    const onSubmit = useCallback((data) => {
        const { email, password } = data;
        signin(email, password)
            .then((token) => {
                storeToken(token);
                return token;
            })
            .then((token) => getMyInfo(token))
            .then((myInfo) => setUser(myInfo))
            // TODO: Si la cuenta está verificada ir al Home screen, sinó al EmailConfirmation screen 
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
                        {errors.email && <Text style={styles.textError}>{manageFormFieldErrors(errors.email)}</Text>}

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
                        {errors.password && <Text style={styles.textError}>{manageFormFieldErrors(errors.password)}</Text>}

                        <Button title="Iniciar sesión" onPress={handleSubmit(onSubmit)} />
                    </View>
                </View>
            </View>
        </View>
    );
};
