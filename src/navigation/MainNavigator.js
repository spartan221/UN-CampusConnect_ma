import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { screens } from '../utilities/constants';
import Home from '../screens/Home';
import TutorProfile from '../screens/TutorProfile';
import { UserContext } from '../utilities/UserContext';
import CallForm from '../screens/CallForm';
import Calls from '../screens/Calls';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <Tab.Navigator initialRouteName={screens.home} screenOptions={{ tabBarHideOnKeyboard: true }}>
      {/* 
        TODO: Aquí van los componentes que pueden ser seleccionados
        cuando el usuario ya está autenticado
        */}
      <Tab.Screen name={screens.home} component={Home} />
      {user.role === 'tutor' && <Tab.Screen name={screens.tutorProfile} component={TutorProfile} />}
      {user.role === 'admin' && <Tab.Screen name={screens.callForm} component={CallForm} />}
      <Tab.Screen name={screens.calls} component={Calls} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
