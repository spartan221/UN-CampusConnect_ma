import React, { useCallback, useContext, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { getMyInfo, signin } from '../GraphQL';
import { UserContext } from '../utilities/UserContext';
import { emailPattern } from '../utilities/patterns';
import { screens, validationMessages } from '../utilities/constants';
import { manageError } from '../utilities/errors';
import { storeToken } from '../utilities/jwt';
import { FormControl, Input, Button, HStack, Spinner, Heading, Center } from 'native-base';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
    overflow: 'scroll',
  },
  formWrapper: {
    flex: 1,
    padding: '10%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  loginIcon: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  textError: {
    color: 'red',
  },
});

export default Authentication = (props) => {
  // Properties
  const { navigation } = props;

  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = useCallback((data) => {
    const { email, password } = data;
    setIsLoading(true);
    signin(email, password)
      .then((token) => storeToken(token))
      .then(() => getMyInfo())
      .then((myInfo) => {
        setIsLoading(false);
        setUser(myInfo);
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
            Iniciando sesión...
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <View style={styles.content}>
      <View style={styles.formWrapper}>
        <View style={styles.form}>
          <Image source={require('../../assets/logo.png')} style={styles.loginIcon} />
          <View>
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
            <Button onPress={handleSubmit(onSubmit)} bg="#20403a" marginTop={5}>
              Iniciar sesión
            </Button>
            <Button onPress={() => navigation.navigate(screens.signup)} bg="#20403a" marginTop={2}>
              Registrarse
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
