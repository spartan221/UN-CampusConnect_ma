import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { getCalls } from '../GraphQL';
import { HStack, Heading, Spinner } from 'native-base';

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
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Cargando datos...
        </Heading>
      </HStack>
    );
  }

  const Calls = myData;

  const handleCallPress = (call) => {
    setSelectedCall(call);
    setModalVisible(true);
  };

  return (
    <View>
      {Calls.map((call, index) => (
        <TouchableOpacity key={index} onPress={() => handleCallPress(call)}>
          <View>
            <Text>{call.nameGroup}</Text>
            <Text>{call.status}</Text>
            <Text>{call.deadline}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <View>
          {selectedCall && (
            <View>
              <Text>{selectedCall.nameGroup}</Text>
              <Text>{selectedCall.maximunParticipants}</Text>
              <Text>{selectedCall.place}</Text>
              <Text>{selectedCall.schedule}</Text>
              <Text>{selectedCall.deadline}</Text>
              <Text>{selectedCall.status}</Text>
              <Text>{selectedCall.participants.join(', ')}</Text>

              <Button title="Inscribirse" onPress={() => console.log('Inscripción')} />
            </View>
          )}
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Calls;
