import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as screens from './screens';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Home'}>
      {Object.keys(screens).map((screenName, index) => (
        <Stack.Screen
          key={index}
          name={screenName}
          component={screens[screenName]}
        />
      ))}
    </Stack.Navigator>
  );
};
