import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as screens from './screens';

const Stack = createNativeStackNavigator();
const screenTitles = {
  Indicators: 'Indicadores',
  IndicatorDetail: 'Detalles',
};

export default () => {
  return (
    <Stack.Navigator initialRouteName={'Indicators'}>
      {Object.keys(screens).map((screenName, index) => (
        <Stack.Screen
          key={index}
          name={screenName}
          options={{title: screenTitles[screenName]}}
          component={screens[screenName]}
        />
      ))}
    </Stack.Navigator>
  );
};
