import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={() => null} />
      </Navigator>
    </NavigationContainer>
  );
};
