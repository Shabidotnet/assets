import React from 'react';
import {View, StyleSheet, TouchableOpacity,Image} from 'react-native';

function ListButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
        style={{width:24,height:24}}
        source={require("../../assets/tabBar/midIcon.png")}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2DC3A1',
    width: 80,
    height: 80,
    borderRadius: 40,
    bottom: 30,
    borderColor: 'white',
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ListButton;
