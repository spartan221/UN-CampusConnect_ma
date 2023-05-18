import React, { useCallback } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { validationMessages } from "../utilities/constants";
import { emailPattern } from "../utilities/patterns";
import { resendEmail } from "../GraphQL";
import { manageError, manageFormFieldErrors } from '../utilities/errors';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%',
    },
});

const ResendEmailConfirmation = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = useCallback((data) => {
        const { email } = data;
        resendEmail(email)
            .then(() => {
                console.log('Código de activación reenviado');
                //TODO: mensaje de confirmación de que el código fue reenviado y redireccionar al 
                // authentication screen
            })
            .catch((error) => manageError(error));
    }, []);

    return (
        <View style={styles.content}>
            <Text>Ingrese su correo electrónico para recibir el código de activación</Text>
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
                        placeholder="Correo electrónico"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text>{manageFormFieldErrors(errors.email)}</Text>}
            <Button title="Enviar código de activación" onPress={handleSubmit(onSubmit)} />
        </View>
    )
};

export default ResendEmailConfirmation;