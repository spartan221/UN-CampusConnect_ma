import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { createTutorProfile, getTutorProfile } from '../utilities/tutorprofile';

export default TutorProfileForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    fields: languages,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'languages_attributes',
  });

  const {
    fields: skills,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills_attributes',
  });

  const {
    fields: schools,
    append: appendSchool,
    remove: removeSchool,
  } = useFieldArray({
    control,
    name: 'schools_attributes',
  });

  const {
    fields: jobs,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray({
    control,
    name: 'jobs_attributes',
  });

  const onSubmit = (data) => {
    const tutor = { tutor: data };
    console.log(tutor);
    createTutorProfile(tutor)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    /*getTutorProfile('644fd256c5018adaa8473fc3')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });*/
  };
  /* {"address": "CRA 1", "birthDate": "2001-02-02", "birthPlace": "Tunja", "description": "Yo soy un tutor de programación ", "email": "danvargasgo@unal.edu.co", "firstName": "Daniel", "jobs": [{"company": "Bbva", "end_year": "2002-02-02", "position": "Gerente", "start_year": "2001-02-02"}], "languages": [{"language": "Inglés ", "level": "C1"}], "lastName": "Vargas", "phone": "310101010101", "schools": [{"end_year": "2003-02-02", "name": "Unal", "start_year": "2002-02-02", "title": "Ingeniero de Sistemas"}], "skills": [{"skill": "Dormir"}]}
   */
  return (
    <ScrollView>
      <View style={styles.content}>
        <View style={styles.formWrapper}>
          <View style={styles.form}>
            <Text>Registro Perfil Tutor</Text>
            <View>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Nombre"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="name"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Apellido"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="last_name"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Lugar de Nacimiento"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="birth_place"
              />

              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: 'La fecha debe tener el formato AAAA-MM-DD',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Fecha de Nacimiento (AAAA-MM-DD)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="birthdate"
              />
              <ErrorMessage
                errors={errors}
                name="birthdate"
                render={({ message }) => <Text>{message}</Text>}
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Dirección"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="address"
              />

              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Correo electrónico inválido',
                  },
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
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <Text>{message}</Text>}
              />

              <Controller
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'No es un número de teléfono válido',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Teléfono"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="phone"
              />
              <ErrorMessage
                errors={errors}
                name="phone"
                render={({ message }) => <Text>{message}</Text>}
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Descripción"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="description"
              />

              <Text>Habilidades</Text>
              {skills.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Habilidad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`skills_attributes[${index}].name`}
                  />
                  <Button title="Eliminar Habilidad" onPress={() => removeSkill(index)} />
                </View>
              ))}
              <Button title="Agregar Habilidad" onPress={() => appendSkill({ name: '' })} />

              <Text>Idiomas</Text>
              {languages.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Idioma"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`languages_attributes[${index}].name`}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Nivel"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`languages_attributes[${index}].level`}
                  />
                  <Button title="Eliminar Idioma" onPress={() => removeLanguage(index)} />
                </View>
              ))}
              <Button
                title="Agregar Idioma"
                onPress={() => appendLanguage({ name: '', level: '' })}
              />

              <Text>Educación</Text>
              {schools.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Institución"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`schools_attributes[${index}].name`}
                  />
                  <Controller
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: 'La fecha debe tener el formato AAAA-MM-DD',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Año de inicio"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`schools_attributes[${index}].start_year`}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`schools_attributes[${index}].start_year`}
                    render={({ message }) => <Text>{message}</Text>}
                  />

                  <Controller
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: 'La fecha debe tener el formato AAAA-MM-DD',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Año de finalización"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`schools_attributes[${index}].end_year`}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`schools_attributes[${index}].end_year`}
                    render={({ message }) => <Text>{message}</Text>}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Título"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`schools_attributes[${index}].title`}
                  />

                  <Button title="Eliminar Título" onPress={() => removeSchool(index)} />
                </View>
              ))}
              <Button
                title="Agregar Título"
                onPress={() => appendSchool({ name: '', start_year: '', end_year: '' })}
              />

              <Text>Experiencia</Text>
              {jobs.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Empresa"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`jobs_attributes[${index}].name`}
                  />
                  <Controller
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: 'La fecha debe tener el formato AAAA-MM-DD',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Año de inicio"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`jobs_attributes[${index}].start_year`}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`jobs_attributes[${index}].start_year`}
                    render={({ message }) => <Text>{message}</Text>}
                  />

                  <Controller
                    control={control}
                    rules={{
                      pattern: {
                        value: /^\d{4}-\d{2}-\d{2}$/,
                        message: 'La fecha debe tener el formato AAAA-MM-DD',
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Año de finalización"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`jobs_attributes[${index}].end_year`}
                  />
                  <ErrorMessage
                    errors={errors}
                    name={`jobs_attributes[${index}].end_year`}
                    render={({ message }) => <Text>{message}</Text>}
                  />

                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Puesto"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={`jobs_attributes[${index}].position`}
                  />

                  <Button title="Eliminar Experiencia" onPress={() => removeJob(index)} />
                </View>
              ))}
              <Button
                title="Agregar Experiencia"
                onPress={() => appendJob({ name: '', start_year: '', end_year: '' })}
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
