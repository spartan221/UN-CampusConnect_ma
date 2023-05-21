import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authentication from './src/components/Authentication';
import TutorProfile from './src/screens/TutorProfile';
import TutorProfileForm from './src/screens/TutorProfileForm';
import { getTutorProfile } from './src/utilities/tutorprofile';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <TutorProfile data={{}} />
    </SafeAreaView>
  );
};
