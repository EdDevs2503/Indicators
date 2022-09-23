import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WhiteSpace} from '@ant-design/react-native';
import moment from 'moment';

export const IndicatorSerieDetail = ({data, prefix}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.principalText}>
        {prefix}
        {data.valor}
      </Text>
      <WhiteSpace size="xl" />
      <View style={styles.section}>
        <Text style={styles.label}>Nombre</Text>
        <WhiteSpace />
        <Text style={styles.value}>{data.nombre}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Fecha</Text>
        <WhiteSpace />
        <Text style={styles.value}>{moment(data.fecha).format('ll')}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Unidad de medida</Text>
        <WhiteSpace />
        <Text style={styles.value}>{data.unidad_medida}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  principalText: {
    fontSize: 36,
    color: '#1890ff',
  },
  section: {
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1890ff',
    // borderWidth: 0.4,
    width: '80%',
    // paddingHorizontal: 10,
    // textAlign: 'center',
    textAlignVertical: 'center',
    // borderRadius: 3,
  },
});
