import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  SectionList,
  StatusBar,
  ScrollView,
} from 'react-native';

const DATA1 = [
  {
    title: 'Universidad Nacional',
    data: [
      'Fecha Inicio: 23-10-2019',
      'Fecha Fin: 22-11-2022',
      'Título: Ingeniero de Sistemas y Computación',
    ],
  },
  {
    title: 'Universidad EAFIT',
    data: [
      'Fecha Inicio: 23-10-2019',
      'Fecha Fin: 22-11-2022',
      'Título: PhD en Ingeniería de Sistemas y Computación',
    ],
  },
  {
    title: 'Universidad de los Andes',
    data: [
      'Fecha Inicio: 23-10-2019',
      'Fecha Fin: 22-11-2022',
      'Título: Maestría en Ingeniería de Sistemas y Computación',
    ],
  },
];

const DATA2 = [
  {
    title: 'Google',
    data: ['Fecha Inicio: 23-10-2019', 'Fecha Fin: 22-11-2022', 'Posición: Desarrollador Junior'],
  },
  {
    title: 'Microsoft',
    data: ['Fecha Inicio: 23-10-2019', 'Fecha Fin: 22-11-2022', 'Posición: Arquitecto de Software'],
  },
  {
    title: 'Amazon',
    data: ['Fecha Inicio: 23-10-2019', 'Fecha Fin: 22-11-2022', 'Posición: Desarrollador Senior'],
  },
];

const TutorProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.rowLayout}>
          <Image source={require('../../assets/photo.jpg')} style={styles.image} />
          <Text>Daniel Vargas</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Me llamo Daniel Vargas y soy un Ingeniero de Sistemas y Computación</Text>
          <Text>Fecha de Nacimiento: 23-10-2001</Text>
          <Text>Lugar de Nacimiento: Tunja</Text>
          <Text>Dirección: Cra 23 #57-20</Text>
          <Text>Correo Electrónico: danvargasgo@unal.edu.co</Text>
          <Text>Teléfono: 3102158245</Text>
          <View>
            <Text>Estudios</Text>
            <SectionList
              sections={DATA1}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View>
                  <Text>{item}</Text>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              )}
            />

            <Text>Trabajos</Text>
            <SectionList
              nestedScrollEnabled={false}
              sections={DATA2}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View>
                  <Text>{item}</Text>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              )}
            />

            <Text>Trabajos</Text>
            <SectionList
              nestedScrollEnabled={false}
              sections={DATA2}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <View>
                  <Text>{item}</Text>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              )}
            />
          </View>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Hola</Text>
          <Text>Chao</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 220,
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
export default TutorProfile;
