import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getCalls } from '../GraphQL';
import { HStack, Heading, Spinner, VStack, Center, Modal, Button } from 'native-base';
import Card from '../components/Card';

const Calls = () => {
  const [selectedCall, setSelectedCall] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myData, setMyData] = useState({});

  useEffect(() => {
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const fetchData = async () => {
    await getCalls()
      .then((response) => {
        setMyData(response);
        console.log(myData);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  if (isLoading) {
    return (
      <Center flex={1}>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color="#61735a" />
          <Heading color="#61735a" fontSize="md">
            Cargando datos...
          </Heading>
        </HStack>
      </Center>
    );
  }

  const Calls = myData;

  const handleCallPress = (call) => {
    setSelectedCall(call);
    setModalVisible(true);
  };

  return (
    <VStack space={5} justifyContent={'center'} paddingTop={'11%'}>
      {Calls.map((call, index) => (
        <TouchableOpacity key={index} onPress={() => handleCallPress(call)}>
          <Card nameGroup={call.nameGroup} status={call.status} deadline={call.deadline} />
        </TouchableOpacity>
      ))}
      <Center>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Body>
              {selectedCall && (
                <View>
                  <Text>Nombre del Grupo: {selectedCall.nameGroup}</Text>
                  <Text>Máximo de participantes: {selectedCall.maximunParticipants}</Text>
                  <Text>Lugar: {selectedCall.place}</Text>
                  <Text>Horario: {selectedCall.schedule}</Text>
                  <Text>Fecha límite inscripción: {selectedCall.deadline}</Text>
                  <Text>Estado: {selectedCall.status}</Text>
                  <Text>Participantes: {selectedCall.participants.join(', ')}</Text>
                </View>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  Inscribirse
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </VStack>
  );
};

export default Calls;
