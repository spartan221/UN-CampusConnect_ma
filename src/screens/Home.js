import React, { useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { deleteToken } from '../utilities/jwt';
import { UserContext } from '../utilities/UserContext';
import { screens } from '../utilities/constants';
import { Box, Text, Button, Center, Flex, VStack } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Home = (props) => {
  // Properties
  const { navigation } = props;

  const [user, setUser] = useContext(UserContext);

  const manageLogOut = useCallback(async () => {
    await deleteToken();
    setUser(null);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <Box
          flex={1}
          bg={{
            linearGradient: {
              colors: ['rgba(32,64,58,0.9)', 'rgba(97,115,90,0.8)'],
              start: [0, 1],
              end: [1, 0],
            },
          }}
          p="12"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            textAlign: 'left',
          }}>
          <Text fontSize={'md'} color={'#f2ead0'}>
            Nombre: {user.username}
          </Text>
          <Text fontSize={'md'} color={'#f2ead0'}>
            Correo: {user.email}
          </Text>
          <Text fontSize={'md'} color={'#f2ead0'}>
            Rol: {user.role}
          </Text>
          <Center>
            <Button size={'xs'} width={'50%'} bg="#20403a" onPress={manageLogOut} marginTop={5}>
              Cerrar Sesión
            </Button>
          </Center>
        </Box>
        <VStack space={20} justifyContent={'center'} flex={5} p={'10%'} bg="#f4fbfa">
          <Button
            borderRadius={'xl'}
            bg="#20403a"
            flex={1}
            shadow={9}
            onPress={() => navigation.navigate(screens.bienestarNavigator)}>
            <Text fontSize={'lg'} color={'#f2ead0'}>
              Bienestar
            </Text>
          </Button>
          <Button
            borderRadius={'xl'}
            bg="#20403a"
            flex={1}
            shadow={9}
            onPress={() => navigation.navigate(screens.calls)}>
            <Text fontSize={'lg'} color={'#f2ead0'}>
              Convocatorias
            </Text>
          </Button>
          {user.role === 'tutor' && (
            <Button
              borderRadius={'xl'}
              bg="#20403a"
              flex={1}
              shadow={9}
              onPress={() => navigation.navigate(screens.tutorProfile)}>
              <Text fontSize={'lg'} color={'#f2ead0'}>
                {screens.tutorProfile}
              </Text>
            </Button>
          )}
          {user.role === 'admin' && (
            <Button
              borderRadius={'xl'}
              bg="#20403a"
              flex={1}
              shadow={9}
              onPress={() => navigation.navigate(screens.callForm)}>
              <Text fontSize={'lg'} color={'#f2ead0'}>
                {screens.callForm}
              </Text>
            </Button>
          )}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
