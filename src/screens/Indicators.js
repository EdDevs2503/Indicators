import React, {useState, useCallback, useMemo} from 'react';
import {View, Keyboard, StatusBar, StyleSheet, FlatList} from 'react-native';
import {List, ActivityIndicator} from '@ant-design/react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {SearchBar} from '@ant-design/react-native';
import {useGetData} from '../hooks/useGetData';
import Fuse from 'fuse.js';
import {useNavigation} from '@react-navigation/native';

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
  const toIndicatorDetail = useCallback(() => {
    navigation.navigate('IndicatorDetail');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar animated={true} barStyle={'dark-content'} />
      <SearchBar
        value={toSearch}
        placeholder="Bitcoin"
        cancelText="Borrar"
        onCancel={handleCancel}
        onChange={setToSearch}
        disabled={isLoading || dataReadyToUse.length === 0}
      />
      {isLoading && (
        <View style={styles.centerCont}>
          <ActivityIndicator />
        </View>
      )}
      {!isLoading && (
        <FlatList
          data={toSearch ? searchedData : dataReadyToUse}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => (
            <Item
              extra={
                <IconOutline name="right-circle" size={24} color="#1890ff" />
              }
              onPress={toIndicatorDetail}>
              {item.nombre}
              <Brief>{item.unidad_medida}</Brief>
            </Item>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
    flex: 1,
  },
  centerCont: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
