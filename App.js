import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './src/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar hidden={true} />
      <AppNavigator />
    </>
  );
};

export default App;
