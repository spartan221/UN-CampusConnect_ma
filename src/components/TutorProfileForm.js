import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { createTutorProfile } from '../GraphQL';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config/firebase/firebase';
import { FormControl, Input, Button } from 'native-base';

export default TutorProfileForm = ({ setProfileTutorCreated }) => {
  const [image, setImage] = useState(null);

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async (data) => {
    console.log('Aqui');
    var uploadUrl =
      'https://firebasestorage.googleapis.com/v0/b/un-campusconnect.appspot.com/o/user-2935527_1280.png?alt=media&token=fd362d60-80b3-4129-b6db-18f21abe7a63';
    if (image !== null) {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf('/') + 1);
      var ref = firebase.storage().ref().child(filename).put(blob);

      try {
        await ref;
        uploadUrl = await ref.snapshot.ref.getDownloadURL();
        console.log(uploadUrl);
        console.log('Imagen subida exitosamente');
      } catch (error) {
        console.log(error);
      }
      //setImage(null);
    }
    data.photo = uploadUrl;
    const tutor = { tutor: data };
    console.log(tutor);
    createTutorProfile(tutor)
      .then((response) => {
        console.log(response);
        Alert.alert('Hoja de vida creada exitosamente');
        setProfileTutorCreated(true);
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
            <Text>Registro Perfil Tutor</Text>
            <View>
              <Text>Foto de Perfil</Text>
              <Button bg="#20403a" marginTop={2} onPress={pickImage}>
                Selecciona una imagen de perfil
              </Button>

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl>
                    <FormControl.Label>Nombre</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
                )}
                name="name"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl>
                    <FormControl.Label>Apellido</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
                )}
                name="last_name"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl>
                    <FormControl.Label>Lugar de Nacimiento</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
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
                  <FormControl>
                    <FormControl.Label>Fecha de Nacimiento (AAAA-MM-DD)</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
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
                  <FormControl>
                    <FormControl.Label>Dirección</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
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
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'No es un número de teléfono válido',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl>
                    <FormControl.Label>Teléfono</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
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
                  <FormControl>
                    <FormControl.Label>Descripción</FormControl.Label>
                    <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                  </FormControl>
                )}
                name="description"
              />

              {skills.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl>
                        <FormControl.Label>Habilidad</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
                    )}
                    name={`skills_attributes[${index}].name`}
                  />
                  <Button bg="#20403a" marginTop={2} onPress={() => removeSkill(index)}>
                    Eliminar Habilidad
                  </Button>
                </View>
              ))}
              <Button bg="#20403a" marginTop={2} onPress={() => appendSkill({ name: '' })}>
                Agregar Habilidad
              </Button>

              {languages.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl>
                        <FormControl.Label>Idioma</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
                    )}
                    name={`languages_attributes[${index}].name`}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl>
                        <FormControl.Label>Nivel</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
                    )}
                    name={`languages_attributes[${index}].level`}
                  />
                  <Button bg="#20403a" marginTop={2} onPress={() => removeLanguage(index)}>
                    Eliminar Idioma
                  </Button>
                </View>
              ))}
              <Button
                bg="#20403a"
                marginTop={2}
                onPress={() => appendLanguage({ name: '', level: '' })}>
                Agregar Idioma
              </Button>

              <Text>Educación</Text>
              {schools.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl>
                        <FormControl.Label>Institución</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
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
                      <FormControl>
                        <FormControl.Label>Año de Inicio (AAAA-MM-DD)</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
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
                      <FormControl>
                        <FormControl.Label>Año de finalización (AAAA-MM-DD)</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
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
                      <FormControl>
                        <FormControl.Label>Título</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
                    )}
                    name={`schools_attributes[${index}].title`}
                  />

                  <Button bg="#20403a" marginTop={2} onPress={() => removeSchool(index)}>
                    Eliminar título
                  </Button>
                </View>
              ))}
              <Button
                bg="#20403a"
                marginTop={2}
                onPress={() => appendSchool({ name: '', start_year: '', end_year: '' })}>
                Agregar título
              </Button>

              {jobs.map((item, index) => (
                <View key={item.id}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl>
                        <FormControl.Label>Compañía</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
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
                      <FormControl>
                        <FormControl.Label>Año de Inicio (AAAA-MM-DD)</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
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
                      <FormControl>
                        <FormControl.Label>Año de finalización (AAAA-MM-DD)</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
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
                      <FormControl>
                        <FormControl.Label>Posición</FormControl.Label>
                        <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                      </FormControl>
                    )}
                    name={`jobs_attributes[${index}].position`}
                  />

                  <Button bg="#20403a" marginTop={2} onPress={() => removeJob(index)}>
                    Eliminar Experiencia
                  </Button>
                </View>
              ))}
              <Button
                bg="#20403a"
                marginTop={2}
                onPress={() => appendJob({ name: '', start_year: '', end_year: '' })}>
                Agregar Experiencia
              </Button>

              <Button bg="#20403a" marginTop={4} onPress={handleSubmit(onSubmit)}>
                Crear
              </Button>
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
