import React, { useEffect, useState } from 'react';
import { UserContext } from '../utilities/UserContext';
import TutorProfileForm from '../components/TutorProfileForm';
import TutorProfileView from '../components/TutorProfileView';
import { getTutorProfile } from '../GraphQL';
import { View, Text } from 'react-native';
import { HStack, Heading, Spinner } from 'native-base';

const TutorProfile = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [profileTutorCreated, setProfileTutorCreated] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    const resp = await getTutorProfile(user.id);
    console.log(resp);
    if (resp !== null) {
      setProfileTutorCreated(true);
    }
  };

  useEffect(() => {
    getProfile().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Cargando datos...
        </Heading>
      </HStack>
    );
  }

  if (profileTutorCreated) {
    return <TutorProfileView id={user.id} />;
  }
  return <TutorProfileForm setProfileTutorCreated={setProfileTutorCreated} />;
};

export default TutorProfile;
