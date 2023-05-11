import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TutorProfile from './src/screens/TutorProfile';

export default function App() {
  const message = 'Hello';
  return (
    <View style={styles.container}>
      <TutorProfile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
