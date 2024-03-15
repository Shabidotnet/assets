import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';

const ReviewItem = ({review, reviewerName, rating}) => {
  return (
    <View
      style={{
        width: '100%',
        height: undefined,
        backgroundColor: '#F6F6F6',
        padding: 10,
        marginBottom:10
      }}>
      <Text style={{color: '#444952'}}>{review}</Text>
      <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10}} >
        <View style={{flexDirection:'row',alignItems:'center'}} >
          {[1, 2, 3, 4, 5].map(() => (
            <Image
              source={require('../../../../assets/review/start.png')}
              style={{width: 12, height: 12}}
            />
          ))}
          <Text style={{color: '#444952', marginLeft: 8}}>4.5</Text>
        </View>
        <Text style={{color: '#444952'}}>{reviewerName}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
