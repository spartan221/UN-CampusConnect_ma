import React, { useCallback, useMemo, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ROLES, TRANSLATED_ROLES, validationMessages } from '../utilities/constants';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { signup } from '../GraphQL';
import { emailPattern } from '../utilities/patterns';
import { manageError } from '../utilities/errors';
import { alertWindow } from '../utilities/alert';
import { FormControl, Input, Button, HStack, Spinner, Heading, Center } from 'native-base';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
});

const Registration = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      role: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const radioButtons = useMemo(() => {
    return ROLES.map((role, idx) => ({
      id: role,
      label: TRANSLATED_ROLES[role].charAt(0).toUpperCase() + TRANSLATED_ROLES[role].slice(1),
    }));
  }, []);

  const onSubmit = useCallback((data) => {
    const { username, email, password, role } = data;
    setIsLoading(true);
    signup(username, email, password, role)
      .then(() => {
        reset();
        setIsLoading(false);
        alertWindow(
          'Usuario registrado',
          'Por favor, revise su correo para activar la cuenta',
          'Aceptar'
        );
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
            Registrandose...
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <View style={styles.content}>
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
            <FormControl.Label>Email</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          </FormControl>
        )}
        name="email"
      />
      <ErrorMessage errors={errors} name="email" render={({ message }) => <Text>{message}</Text>} />
      <Controller
        control={control}
        rules={{
          required: {
            message: validationMessages.required,
            value: true,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControl.Label>Nombre de usuario</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          </FormControl>
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
            value: true,
          },
          minLength: {
            message: validationMessages.password,
            value: 8,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} type="password" />
          </FormControl>
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
            value: true,
          },
          validate: (fieldValue) =>
            fieldValue == getValues('password') || validationMessages.repeatPassword,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControl.Label>Confirmación de contraseña</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} type="password" />
          </FormControl>
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
            value: true,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <RadioGroup
            radioButtons={radioButtons}
            onPress={onChange}
            selectedId={value}
            layout="row"
          />
        )}
        name="role"
      />
      <ErrorMessage errors={errors} name="role" render={({ message }) => <Text>{message}</Text>} />
      <Button onPress={handleSubmit(onSubmit)} bg="#20403a" marginTop={2}>
        Registrar
      </Button>
    </View>
  );
};

export default Registration;
