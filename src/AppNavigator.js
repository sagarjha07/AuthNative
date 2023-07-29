import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={navigationOptions}
        />
        <Stack.Screen
          name="signup"
          component={SignupScreen}
          options={navigationOptions}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={navigationOptions}
        />
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={navigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const navigationOptions = {
  headerShown: false,
};

export default AppNavigator;
