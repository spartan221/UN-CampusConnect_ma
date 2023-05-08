import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const message = "Hello"
  return (
    <View style={{ backgroundColor: '#ddd', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello World</Text>
      <Text>Hello World</Text>
      <Text>{message}</Text>
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
