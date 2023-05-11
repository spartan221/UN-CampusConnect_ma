import React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import request from '../utilities/request';
import GraphQLQuery from '../utilities/GraphQLQuery';
import { GRAPHQL } from '../utilities/constants';
import { signin } from '../utilities/auth';


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
        width: 100,
        height: 150,
    },
});

export default Authentication = () => {
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



    const onSubmit = (data) => {
        const { email, password } = data;
        signin(email, password)
            .then((token) => {
                console.log(token);
            })
            .catch((errors) => {
                // TODO: manage erros
                console.log(errors);
            });
    };

    return (
        <View style={styles.content}>
            <View style={styles.formWrapper}>
                <View style={styles.form}>
                    <Text>Logo UN-CampusConnect</Text>
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
