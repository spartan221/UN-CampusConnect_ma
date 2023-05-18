import React, { useCallback, useMemo } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ROLES, TRANSLATED_ROLES, validationMessages } from '../utilities/constants';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { signup } from '../GraphQL';
import { emailPattern } from '../utilities/patterns';
import { manageError, manageFormFieldErrors } from '../utilities/errors';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const Registration = () => {

    const { control, handleSubmit, formState: { errors }, getValues } = useForm({
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
            .then((data) => {
                // TODO: Navigate to EmailConfirmation screen.
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
            {errors.email && <Text>{manageFormFieldErrors(errors.email)}</Text>}
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
            {errors.username && <Text>{manageFormFieldErrors(errors.username)}</Text>}
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
            {errors.password && <Text>{manageFormFieldErrors(errors.password)}</Text>}
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
            {errors.repeatPassword && <Text>{manageFormFieldErrors(errors.repeatPassword)}</Text>}
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
            {errors.role && <Text>{manageFormFieldErrors(errors.role)}</Text>}
            <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
        </View>
    )
};


export default Registration;