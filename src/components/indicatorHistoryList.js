import React from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {List} from '@ant-design/react-native';
import moment from 'moment';

const Item = List.Item;
const Brief = Item.Brief;

export const IndicatorHistoryList = ({data, prefix}) => {
  return (
    <List>
      {data.map((item, index) => (
        <Item
          key={index}
          extra={<Brief>{moment(item.fecha).format('ll')}</Brief>}>
          <Text style={styles.valueText}>
            {prefix}
            {item.valor}
          </Text>
        </Item>
      ))}
    </List>
  );
};

const styles = StyleSheet.create({
  valueText: {
    fontSize: 18,
    color: '#1890ff',
  },
});
