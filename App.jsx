import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
import RNBootSplash from 'react-native-bootsplash';


const App = () => {
 
  useEffect(() => {
    // İlk açılışta splash 5 saniye göster
    const timer = setTimeout(() => {
      RNBootSplash.hide({ fade: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
