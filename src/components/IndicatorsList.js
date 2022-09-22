import React from 'react';
import {FlatList} from 'react-native';
import {List} from '@ant-design/react-native';
import {IconOutline} from '@ant-design/icons-react-native';

const Item = List.Item;
const Brief = Item.Brief;

export const IndicatorsList = ({data, onPress}) => {
  return (
    <List>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item}) => (
          <Item
            extra={
              <IconOutline name="right-circle" size={24} color="#1890ff" />
            }
            onPress={onPress}>
            {item.nombre}
            <Brief>{item.unidad_medida}</Brief>
          </Item>
        )}
      />
    </List>
  );
};
