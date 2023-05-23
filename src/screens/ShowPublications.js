import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { getPublications } from '../GraphQL';
import { manageError } from '../utilities/errors';
import CardPublication from '../components/CardPublication';
import { HStack, Spinner, Heading, Center } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ShowPublications = () => {
  const [publications, setPublications] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    setRefreshing(true);
    getPublications()
      .then((fetchedPublications) => {
        setPublications(fetchedPublications);
        setRefreshing(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setRefreshing(false);
        setIsLoading(false);
        manageError(error);
      });
  }, []);

  //   Load data
  useEffect(() => {
    getPublications()
      .then((fetchedPublications) => {
        setIsLoading(false);
        setPublications(fetchedPublications);
      })
      .catch((error) => {
        setIsLoading(false);
        manageError(error);
      });
  }, []);

  const renderPublication = ({ item }) => {
    const publication = item;
    const { title, content_publication, publication_date, image } = publication;
    return (
      <CardPublication
        title={title}
        description={content_publication}
        date={publication_date}
        imageUrl={image}
      />
    );
  };

  if (isLoading) {
    return (
      <Center flex={1}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color="#61735a" />
          <Heading color="#61735a" fontSize="md">
            Cargando publicaciones...
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={publications}
        renderItem={renderPublication}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => item.publication_id}
      />
    </View>
  );
};

export default ShowPublications;
