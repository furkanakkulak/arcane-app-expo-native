import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { AppProvider } from './ContextProvider';
import UsersScreen from './screens/UsersScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <StatusBar />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Users"
            component={UsersScreen}
          />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
