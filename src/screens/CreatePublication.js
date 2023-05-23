import React from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { createPublication } from '../GraphQL';
import { alertWindow } from '../utilities/alert';
import { manageError } from '../utilities/errors';
import { validationMessages } from '../utilities/constants';


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
        }
    });


    const onSubmit = (data) => {
        const publication = {
            ...data,
            "publication_date": new Date().toISOString(),
            image: 'https://picsum.photos/200'
        };
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
                    required: {
                        message: validationMessages.required,
                        value: true
                    },
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
            <ErrorMessage
                errors={errors}
                name="title"
                render={({ message }) => <Text>{message}</Text>}
            />

            <Controller
                control={control}
                rules={{
                    required: {
                        message: validationMessages.required,
                        value: true
                    },
                    maxLength: {
                        message: '',
                        value: 255
                    },
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
            <ErrorMessage
                errors={errors}
                name="content_publication"
                render={({ message }) => <Text>{message}</Text>}
            />
            <Button title="Crear" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default CreatePublication;