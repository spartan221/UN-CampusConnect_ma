import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addCall } from '../GraphQL';
import { FormControl, Input, Button } from 'native-base';

export default CallForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.status = 'Abierta';
    data.participants = [];
    const { maximunParticipants, nameGroup, place, schedule, deadline, participants, status } =
      data;
    data.maximunParticipants = parseInt(data.maximunParticipants);
    console.log(data);
    addCall(maximunParticipants, nameGroup, place, schedule, deadline, participants, status)
      .then((response) => {
        console.log(response);
        Alert.alert('Convocatoria creada exitosamente');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.content}>
        <View style={styles.formWrapper}>
          <View style={styles.form}>
            <Controller
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl>
                  <FormControl.Label>Nombre del Grupo</FormControl.Label>
                  <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                </FormControl>
              )}
              name="nameGroup"
            />
            <ErrorMessage
              errors={errors}
              name="nameGroup"
              render={({ message }) => <Text>{message}</Text>}
            />

            <Controller
              control={control}
              rules={{
                pattern: {
                  value: /^[0-9]+/,
                  message: 'Número de integrantes requerido',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl>
                  <FormControl.Label>Número Máximo de integrantes</FormControl.Label>
                  <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                </FormControl>
              )}
              name="maximunParticipants"
            />
            <ErrorMessage
              errors={errors}
              name="maximunParticipants"
              render={({ message }) => <Text>{message}</Text>}
            />

            <Controller
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl>
                  <FormControl.Label>Lugar</FormControl.Label>
                  <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                </FormControl>
              )}
              name="place"
            />
            <ErrorMessage
              errors={errors}
              name="place"
              render={({ message }) => <Text>{message}</Text>}
            />

            <Controller
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl>
                  <FormControl.Label>Horario</FormControl.Label>
                  <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                </FormControl>
              )}
              name="schedule"
            />
            <ErrorMessage
              errors={errors}
              name="schedule"
              render={({ message }) => <Text>{message}</Text>}
            />

            <Controller
              control={control}
              rules={{
                required: 'Este campo es requerido',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl>
                  <FormControl.Label>Fecha límite de inscripción</FormControl.Label>
                  <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                </FormControl>
              )}
              name="deadline"
            />
            <ErrorMessage
              errors={errors}
              name="deadline"
              render={({ message }) => <Text>{message}</Text>}
            />

            <Button bg="#20403a" marginTop={4} onPress={handleSubmit(onSubmit)}>
              Crear Convocatoria
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: '10%',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  loginIcon: {
    width: 100,
    height: 150,
  },
});
