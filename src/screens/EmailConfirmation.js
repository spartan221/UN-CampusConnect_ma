import React, { useCallback } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { screens, validationMessages } from "../utilities/constants";
import { activationCodePattern } from "../utilities/patterns";
import { confirmEmail } from "../GraphQL";
import { manageError, manageFormFieldErrors } from '../utilities/errors';
import { alertWindow } from "../utilities/alert";

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: '10%',
    },
});

const EmailConfirmation = (props) => {

    // Properties
    const { navigation } = props;

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            activationCode: '',
        }
    });

    const onSubmit = useCallback((data) => {
        const { activationCode } = data;
        confirmEmail(activationCode)
            .then(() => {
                reset();
                alertWindow('Cuenta activada', 'Ya puede iniciar sesión con normalidad', 'Aceptar');
            })
            .catch((error) => manageError(error));
    }, []);

    return (
        <View style={styles.content}>
            <Text>Ingrese el código de activación enviado a su correo electrónico:</Text>
            <Controller
                control={control}
                rules={{
                    required: {
                        message: validationMessages.required,
                        value: true
                    },
                    pattern: {
                        message: validationMessages.activationCode,
                        value: activationCodePattern
                    }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Código de activación"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="activationCode"
            />
            {errors.activationCode && <Text>{manageFormFieldErrors(errors.activationCode)}</Text>}
            <Button title="Activar cuenta" onPress={handleSubmit(onSubmit)} />
            <Button title="Reenviar código" onPress={() => navigation.navigate(screens.ResendEmailConfirmation)} />
        </View>
    )
};

export default EmailConfirmation;