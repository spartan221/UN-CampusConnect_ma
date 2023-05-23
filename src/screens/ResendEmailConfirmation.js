import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { screens, validationMessages } from '../utilities/constants';
import { emailPattern } from '../utilities/patterns';
import { resendEmail } from '../GraphQL';
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

const ResendEmailConfirmation = (props) => {
  // Properties
  const { navigation } = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback((data) => {
    const { email } = data;
    setIsLoading(true);
    resendEmail(email)
      .then(() => {
        setIsLoading(false);
        reset();
        alertWindow('Código enviado', 'Por favor, revisa tu correo y activa tu cuenta', 'Aceptar');
      })
      .catch((error) => {
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
            Reenviando código de verificación...
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <View style={styles.content}>
      <Text>Ingrese su correo electrónico para recibir el código de activación</Text>
      <Controller
        control={control}
        rules={{
          required: {
            message: validationMessages.required,
            value: true,
          },
          pattern: {
            message: validationMessages.email,
            value: emailPattern,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControl.Label>Correo electrónico</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          </FormControl>
        )}
        name="email"
      />
      <ErrorMessage errors={errors} name="email" render={({ message }) => <Text>{message}</Text>} />
      <Button onPress={handleSubmit(onSubmit)} bg="#20403a" marginTop={2}>
        Enviar código de activación
      </Button>
      <Button
        onPress={() => navigation.navigate(screens.emailConfirmation)}
        bg="#20403a"
        marginTop={2}>
        Volver
      </Button>
    </View>
  );
};

export default ResendEmailConfirmation;
