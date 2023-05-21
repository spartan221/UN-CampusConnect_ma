import React, { useCallback } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { screens, validationMessages } from "../utilities/constants";
import { emailPattern } from "../utilities/patterns";
import { resendEmail } from "../GraphQL";
import { manageError, manageFormFieldErrors } from '../utilities/errors';
import { alertWindow } from "../utilities/alert";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%',
    },
});

const ResendEmailConfirmation = (props) => {

    // Properties
    const { navigation } = props;

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
        }
    });

    const onSubmit = useCallback((data) => {
        const { email } = data;
        resendEmail(email)
            .then(() => {
                reset();
                alertWindow('Código enviado', 'Por favor, revisa tu correo y activa tu cuenta', 'Aceptar');
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
            <Button title="Volver" onPress={() => navigation.navigate(screens.emailConfirmation)} />
        </View>
    )
};

export default ResendEmailConfirmation;