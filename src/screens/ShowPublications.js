import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { getPublications } from '../GraphQL';
import { manageError } from '../utilities/errors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
});

const ShowPublications = () => {

    const [publications, setPublications] = useState([{
        "title": "Hhh",
        "content_publication": "Vvvv",
        "author_publication": "646aa0fd07b6a3b24a7bb0ec",
        "publication_date": "2023-05-22T17:15:57.125522+00:00",
        "publication_id": "40df5ea59e574e09bb7c3505b25db504",
        "image": "Bvv"
    }]);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getPublications()
            .then((fetchedPublications) => {
                setPublications(fetchedPublications);
                setRefreshing(false);
            })
            .catch((error) => manageError(error));
    }, []);



    // Load data
    useEffect(() => {
        getPublications()
            .then((fetchedPublications) => setPublications(fetchedPublications))
            .catch((error) => manageError(error));
    }, []);


    const renderPublication = ({ item }) => {
        const publication = item;
        return (
            <Text>
                {JSON.stringify(publication)}
            </Text>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={publications}
                renderItem={renderPublication}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    )
}

export default ShowPublications;