import React, { useCallback, useMemo } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ROLES, TRANSLATED_ROLES, validationMessages } from '../utilities/constants';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { signup } from '../GraphQL';
import { emailPattern } from '../utilities/patterns';
import { manageError } from '../utilities/errors';
import { alertWindow } from '../utilities/alert';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const Registration = () => {

    const { control, handleSubmit, reset, formState: { errors }, getValues } = useForm({
        defaultValues: {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            role: ''
        }
    });

    const radioButtons = useMemo(() => {
        return ROLES.map((role, idx) => ({
            id: role,
            label: TRANSLATED_ROLES[role].charAt(0).toUpperCase() + TRANSLATED_ROLES[role].slice(1)
        }));
    }, []);

    const onSubmit = useCallback((data) => {
        const { username, email, password, role } = data;
        signup(username, email, password, role)
            .then(() => {
                reset();
                alertWindow('Usuario registrado', 'Por favor, revise su correo para activar la cuenta', 'Aceptar');
            })
            .catch((error) => manageError(error));
    }, []);

    return (
        <View style={styles.content}>
            <Text>Registro</Text>
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
                        placeholder="Email"
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
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Nombre de usuario"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="username"
            />
            <ErrorMessage
                errors={errors}
                name="username"
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
            <Controller
                control={control}
                rules={{
                    required: {
                        message: validationMessages.required,
                        value: true
                    },
                    validate: (fieldValue) => fieldValue == getValues('password') || validationMessages.repeatPassword
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Confirmación de contraseña"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="repeatPassword"
            />
            <ErrorMessage
                errors={errors}
                name="repeatPassword"
                render={({ message }) => <Text>{message}</Text>}
            />
            <Controller
                control={control}
                rules={{
                    required: {
                        message: validationMessages.required,
                        value: true
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={onChange}
                        selectedId={value}
                        layout='row'
                    />
                )}
                name="role"
            />
            <ErrorMessage
                errors={errors}
                name="role"
                render={({ message }) => <Text>{message}</Text>}
            />
            <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
        </View>
    )
};


export default Registration;