import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';

const GraphCard = ({disable, totalSale, totalRevenue}) => {
  return (
    <View
      style={{
        width: '90%',
        aspectRatio: 3.5,
        height: undefined,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 15,
        elevation: 5, // apply shadow
        shadowColor: 'black', // shadow color
        shadowOffset: {width: 0, height: 2}, // shadow offset
        shadowOpacity: 0.2, // shadow opacity
        shadowRadius: 4, // shadow radius
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          //   backgroundColor: 'purple',
          justifyContent: 'space-around',
        }}>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Poppins',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
              •{' '}
            </Text>
            ${totalSale}
          </Text>
          <Text style={{color: 'grey', fontSize: 12, fontFamily: 'Poppins'}}>
            Total Sales
          </Text>
        </View>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Poppins',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
              •{' '}
            </Text>
            220
          </Text>
          <Text style={{color: 'grey', fontSize: 12, fontFamily: 'Poppins'}}>
            Customers
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: 'Poppins',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
              •{' '}
            </Text>
            $ {totalRevenue}
          </Text>
          <Text style={{color: 'grey', fontSize: 12, fontFamily: 'Poppins'}}>
            Total Revenue
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GraphCard;
