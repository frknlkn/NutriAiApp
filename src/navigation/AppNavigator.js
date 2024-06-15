import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../app/tabs/home';
import DietList from '../app/tabs/diet-list';
import Profile from '../app/tabs/profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = ({setIsAuthenticated}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Ana Sayfa') {
              iconName = 'home';
            } else if (route.name === 'Diyet Listesi') {
              iconName = 'list';
            } else if (route.name === 'Profil') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen name="Diyet Listesi" component={DietList} />
        <Tab.Screen name="Profil">
          {props => <Profile {...props} setIsAuthenticated={setIsAuthenticated} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
