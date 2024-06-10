import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalProvider } from './src/context/GlobalProvider';
import SignIn from './src/app/auth/sign-in';
import SignUp from './src/app/auth/sign-up';
import Home from './src/app/tabs/home';
import Profile from './src/app/tabs/profile';
import DietList from './src/app/tabs/diet-list';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="DietList" component={DietList} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
