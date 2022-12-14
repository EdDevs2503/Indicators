import React, {useState, useCallback, useMemo} from 'react';
import {View, Keyboard, StatusBar, StyleSheet, ScrollView} from 'react-native';
import {List, ActivityIndicator} from '@ant-design/react-native';
import {SearchBar} from '@ant-design/react-native';
import {useGetData} from '../hooks/useGetData';
import Fuse from 'fuse.js';
import {useNavigation} from '@react-navigation/native';
import {IndicatorsList} from '../components';

const Item = List.Item;
const Brief = Item.Brief;

export const Indicators = () => {
  const navigation = useNavigation();
  const {data, isLoading} = useGetData('https://mindicador.cl/api');
  const dataReadyToUse = useMemo(() => {
    const result = [];
    Object.keys(data || []).forEach(key => {
      if (typeof data[key] === 'object') {
        result.push(data[key]);
      }
    });
    return result;
  }, [data]);
  const [toSearch, setToSearch] = useState('');
  const handleCancel = useCallback(() => {
    setToSearch('');
    Keyboard.dismiss();
  }, []);
  const searchedData = useMemo(() => {
    const fruits = dataReadyToUse;
    const fuse = new Fuse(fruits, {
      keys: ['unidad_medida', 'nombre', 'codigo'],
    });
    return fuse.search(toSearch).map(result => result.item);
  }, [dataReadyToUse, toSearch]);
  const toIndicatorDetail = useCallback(
    indicator => {
      navigation.navigate('IndicatorDetail', {
        indicator,
      });
    },
    [navigation],
  );
  if (isLoading) {
    return (
      <View style={styles.centerCont}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar animated={true} barStyle={'dark-content'} />
      <SearchBar
        value={toSearch}
        placeholder="Bitcoin"
        cancelText="Borrar"
        onCancel={handleCancel}
        onChange={setToSearch}
        disabled={isLoading || dataReadyToUse.length === 0}
      />
      <IndicatorsList
        data={toSearch ? searchedData : dataReadyToUse}
        onPress={toIndicatorDetail}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 10
  },
  centerCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
