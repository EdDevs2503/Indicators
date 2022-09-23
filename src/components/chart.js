import React, {useMemo} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

export const Chart = ({data, prefix}) => {
  const preparedData = useMemo(() => {
    return data.map(item => {
      const date = moment().format('M-D');
      return {
        label: date,
        value: item.valor,
      };
    });
  }, [data]);

  console.log(preparedData.map(({value}) => value));

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: preparedData.map(({label}) => label),
          datasets: [
            {
              data: preparedData.map(({value}) => value),
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={280}
        yAxisLabel={prefix}
        chartConfig={{
          backgroundColor: 'red',
          backgroundGradientFrom: '#69c0ff',
          backgroundGradientTo: '#096dd9',
          // decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: 300,
  },
});
