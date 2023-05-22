import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { createPublication } from '../GraphQL';
import { alertWindow } from '../utilities/alert';
import { manageError } from '../utilities/errors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


const CreatePublication = () => {


    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            "content_publication": '',
            image: ''
        }
    });


    const onSubmit = (data) => {
        const publication = { ...data, "publication_date": new Date().toISOString() };
        const { title, content_publication, publication_date, image } = publication;
        createPublication(title, content_publication, publication_date, image)
            .then((message) => {
                reset();
                alertWindow('Información', message, 'aceptar');
            })
            .catch((error) => manageError(error))
    }

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Título de la publicación"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="title"
            />
            {errors.firstName && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Descripción"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="content_publication"
            />


            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Enlace de imagen"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="image"
            />

            <Button title="Crear" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default CreatePublication;