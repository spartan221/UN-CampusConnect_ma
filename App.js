import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from './src/utilities/UserContext';

import { getMyInfo } from './src/GraphQL';
import { alertWindow } from './src/utilities/alert';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationNavigator from './src/navigation/AuthenticationNavigator';
import MainNavigator from './src/navigation/MainNavigator';

import { NativeBaseProvider, extendTheme } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { HStack, Spinner, Heading, Center } from 'native-base';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getUserInfoWithSavedToken = async () => {
    getMyInfo()
      .then((myInfo) => {
        setIsLoading(false);
        setUser(myInfo);
      })
      .catch(() => {
        setIsLoading(false);
        alertWindow('Error', 'No se pudieron recuperar los datos', 'Aceptar');
      });
  };

  useEffect(() => {
    getUserInfoWithSavedToken();
  }, []);

  const newColorTheme = {
    brand: {
      900: '#8287af',
      800: '#7c83db',
      700: '#b3bef6',
    },
    tema: {
      50: '#20403a',
      100: '#61735a',
      200: '#f2eado',
      300: '#8c6a2b',
      400: '#59310e',
      500: '#f4fbfa',
      600: '#f4fbfa',
    },
  };
  const theme = extendTheme({ colors: newColorTheme });

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  };

  if (isLoading) {
    return (
      <NativeBaseProvider theme={theme} config={config}>
        <Center flex={1}>
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" color="#61735a" />
            <Heading color="#61735a" fontSize="md">
              Cargando información del usuario...
            </Heading>
          </HStack>
        </Center>
      </NativeBaseProvider>
    );
  }

  return (
    <NativeBaseProvider theme={theme} config={config}>
      <UserContext.Provider value={[user, setUser]}>
        <NavigationContainer>
          {user ? <MainNavigator /> : <AuthenticationNavigator />}
        </NavigationContainer>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
};
