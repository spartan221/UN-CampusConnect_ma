import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TutorProfile from '../screens/TutorProfile';
import CallForm from '../screens/CallForm';
import Calls from '../screens/Calls';
import Home from '../screens/Home';
import BienestarNavigator from './BienestarNavigator';
import { screens } from '../utilities/constants';
import { UserContext } from '../utilities/UserContext';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <Stack.Navigator
      initialRouteName={screens.home}
      screenOptions={{ headerStyle: { backgroundColor: '#20403a' }, headerTintColor: '#fff' }}>
      <Stack.Screen name={screens.home} component={Home} options={{ headerShown: false }} />
      <Stack.Screen name={screens.bienestarNavigator} component={BienestarNavigator} />
      <Stack.Screen name={screens.calls} component={Calls} />
      {user.role === 'tutor' && (
        <Stack.Screen name={screens.tutorProfile} component={TutorProfile} />
      )}
      {user.role === 'admin' && <Stack.Screen name={screens.callForm} component={CallForm} />}
    </Stack.Navigator>
  );
};

export default MainNavigator;
