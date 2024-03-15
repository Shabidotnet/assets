import React from 'react';
import {View, TouchableOpacity, Image,Text} from 'react-native';
import PrimaryButton from '../common/button/PrimaryButton';

const CategoryItem = ({title,image}) => {
  console.log("TITLE",title)
  return (
    <TouchableOpacity
      style={{
        width: '42%',
        height: undefined,
        aspectRatio: 0.86,
        alignItems:'center'
        // backgroundColor: 'black',
      }}>
      <View
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1,
          backgroundColor: '#979797',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Image
          source={image}
          style={{width: '100%', height: '100%'}}
          // resizeMode={'cover'}
        />
        
        <PrimaryButton
          title={'Starting from 10$'}
          buttonStyle={{
            position: 'absolute',
            aspectRatio: 4,
            height: undefined,
            width: '90%',
            bottom:10
          }}
          titleStyle={{fontSize: 12}}
        />
      </View>
      <Text style={{color:'black'}} >{title}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
