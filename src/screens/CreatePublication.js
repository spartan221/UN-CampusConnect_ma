import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { createPublication } from '../GraphQL';
import { alertWindow } from '../utilities/alert';
import { manageError } from '../utilities/errors';
import { validationMessages } from '../utilities/constants';
import {
  FormControl,
  Input,
  Button,
  TextArea,
  HStack,
  Spinner,
  Heading,
  Center,
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
});

const CreatePublication = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      content_publication: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * 600);
    return `https://picsum.photos/id/${randomNumber}/200`;
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const publication = {
      ...data,
      publication_date: new Date().toISOString(),
      image: getRandomImage(),
    };
    const { title, content_publication, publication_date, image } = publication;
    createPublication(title, content_publication, publication_date, image)
      .then((message) => {
        setIsLoading(false);
        reset();
        alertWindow('Información', message, 'aceptar');
      })
      .catch((error) => {
        setIsLoading(false);
        manageError(error);
      });
  };

  if (isLoading) {
    return (
      <Center flex={1}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color="#61735a" />
          <Heading color="#61735a" fontSize="md">
            Creando publicación...
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <View style={styles.container}>
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
            <FormControl.Label>Título de la publicación</FormControl.Label>
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          </FormControl>
        )}
        name="title"
      />
      <ErrorMessage errors={errors} name="title" render={({ message }) => <Text>{message}</Text>} />

      <Controller
        control={control}
        rules={{
          required: {
            message: validationMessages.required,
            value: true,
          },
          maxLength: {
            message: '',
            value: 255,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl>
            <FormControl.Label>Descripción</FormControl.Label>
            {/* <Input onBlur={onBlur} onChangeText={onChange} value={value} /> */}
            <TextArea
              h={40}
              placeholder="Información de la publicación"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </FormControl>
        )}
        name="content_publication"
      />
      <ErrorMessage
        errors={errors}
        name="content_publication"
        render={({ message }) => <Text>{message}</Text>}
      />
      <Button onPress={handleSubmit(onSubmit)} bg="#20403a" marginTop={5}>
        Crear publicación
      </Button>
    </View>
  );
};

export default CreatePublication;
