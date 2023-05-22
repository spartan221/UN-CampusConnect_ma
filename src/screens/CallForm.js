import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { addCall } from '../GraphQL';

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.formWrapper}>
          <View style={styles.form}>
            <Text>Creación convocatoria</Text>
            <View>
              <Controller
                control={control}
                rules={{
                  required: 'Este campo es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Nombre del grupo"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
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
                  <TextInput
                    placeholder="Número máximo de integrantes"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
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
                  <TextInput
                    placeholder="Lugar"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
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
                  <TextInput
                    placeholder="Horario"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
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
                  <TextInput
                    placeholder="Fecha límite de inscripción"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="deadline"
              />
              <ErrorMessage
                errors={errors}
                name="deadline"
                render={({ message }) => <Text>{message}</Text>}
              />

              <Button title="Crear" onPress={handleSubmit(onSubmit)} />
            </View>
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
    backgroundColor: '#ccc',
    flex: 1,
    padding: '10%',
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
