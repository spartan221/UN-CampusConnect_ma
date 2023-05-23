import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { screens, validationMessages } from '../utilities/constants';
import { activationCodePattern } from '../utilities/patterns';
import { confirmEmail } from '../GraphQL';
import { manageError } from '../utilities/errors';
import { alertWindow } from '../utilities/alert';
import { FormControl, Input, Button, HStack, Spinner, Heading, Center } from 'native-base';

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      activationCode: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback((data) => {
    const { activationCode } = data;
    setIsLoading(true);
    confirmEmail(activationCode)
      .then(() => {
        reset();
        setIsLoading(false);
        alertWindow('Cuenta activada', 'Ya puede iniciar sesión con normalidad', 'Aceptar');
      })
      .catch((error) => {
        reset();
        setIsLoading(false);
        manageError(error);
      });
  }, []);

  if (isLoading) {
    return (
      <Center flex={1}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color="#61735a" />
          <Heading color="#61735a" fontSize="md">
            Verificando código de activación...
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <View style={styles.content}>
      <Text>Ingrese el código de activación enviado a su correo electrónico:</Text>
      <Controller
        control={control}
        rules={{
          required: {
            message: validationMessages.required,
            value: true,
          },
          pattern: {
            message: validationMessages.activationCode,
            value: activationCodePattern,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControl.Label>Código de activación</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          </FormControl>
        )}
        name="activationCode"
      />
      <ErrorMessage
        errors={errors}
        name="activationCode"
        render={({ message }) => <Text>{message}</Text>}
      />
      <Button onPress={handleSubmit(onSubmit)} bg="#20403a" marginTop={2}>
        Activar cuenta
      </Button>
      <Button
        onPress={() => navigation.navigate(screens.resendEmailConfirmation)}
        bg="#20403a"
        marginTop={2}>
        Reenviar código
      </Button>
    </View>
  );
};

export default EmailConfirmation;
