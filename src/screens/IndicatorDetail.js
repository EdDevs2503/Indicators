import React, {useMemo} from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import {
  Tabs,
  WhiteSpace,
  View,
  ActivityIndicator,
} from '@ant-design/react-native';
import {IndicatorHistoryList, Chart} from '../components';
import {useRoute} from '@react-navigation/native';
import {useGetData} from '../hooks/useGetData';
import {IndicatorSerieDetail} from '../components/indicatorSerieDetail';
import {limitArray} from '../utils';

const tabs = [{title: 'Historial'}, {title: 'Información'}];
const windowHeight = Dimensions.get('window').height;

export const IndicatorDetail = () => {
  const {params} = useRoute();
  const {data, isLoading} = useGetData(
    params?.indicator?.codigo
      ? `https://mindicador.cl/api/${params?.indicator?.codigo}`
      : null,
  );
  const prefix = useMemo(() => {
    if (params?.indicator?.unidad_medida) {
      return params?.indicator?.unidad_medida === 'Pesos' ||
        params?.indicator?.unidad_medida === 'Dólar'
        ? '$'
        : '%';
    }
    return '';
  }, [params?.indicator?.unidad_medida]);

  if (isLoading) {
    return (
      <View style={styles.centerCont}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Tabs tabs={tabs}>
        <View style={styles.tabCont}>
          <ScrollView>
            <IndicatorHistoryList prefix={prefix} data={data?.serie || []} />
          </ScrollView>
        </View>
        <View style={styles.informationCont}>
          <IndicatorSerieDetail
            prefix={prefix}
            data={{
              // safe access to the first item in the list
              ...((data?.serie || [])[0] || {}),
              nombre: params?.indicator?.nombre,
              unidad_medida: params?.indicator?.unidad_medida,
            }}
          />
          <Chart prefix={prefix} data={limitArray(data?.serie || [], 10)} />
        </View>
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabCont: {
    // flex: 1,
  },
  informationCont: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  centerCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
