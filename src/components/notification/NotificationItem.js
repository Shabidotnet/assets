import React from 'react';

import {View, Text,Image} from 'react-native';
import AppHeader from '../common/header/AppHeader';

const NotificationItem = ({icon}) => {
  return (
    <View
      style={{
        width: '90%',
        aspectRatio: 4.46,
        height: undefined,
        elevation: 5, // apply shadow
        shadowColor: 'black', // shadow color
        shadowOffset: {width: 0, height: 2}, // shadow offset
        shadowOpacity: 0.2, // shadow opacity
        shadowRadius: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row',justifyContent:"space-evenly"}}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(104, 206, 182, 0.1)',
            borderRadius: 8,
            marginHorizontal:10,
            justifyContent:'center',
            alignItems:'center',
            
          }}>
            <Image
            source={icon}
            style={{width:16,height:16}}
            />
          </View>
        <View style={{flex:1}}>
          <Text style={{color: 'black', fontSize: 12}}>
            How was your experience with Peter Mcallam?
          </Text>
          <Text style={{color: '#68CEB6', fontSize: 12}}>
            Rate in private how you felt!
          </Text>
          <Text style={{color: 'grey', fontSize: 10}}>1w ago</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;
