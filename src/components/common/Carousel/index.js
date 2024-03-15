import React, {useRef} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';

const AdsCarousel = props => {
  const {data, navigation} = props;
  console.log('datad', data);
  const carouselRef = useRef(null);
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        lockScrollWhileSnapping={true}
        enableSnap={true}
        data={data}
        renderItem={({item}) => renderCarouselItem(item, navigation)}
        sliderWidth={wp('100%')}
        itemWidth={wp('87%')}
        hasParallaxImages={true}
      />
    </View>
  );
};

const renderCarouselItem = (item, navigation) => (
  <View
    style={{
      width: '100%',
      height: undefined,
      aspectRatio: 1.675,
      borderRadius: 20,
      overflow: 'hidden',
    }}>
    <Image source={{uri: item}} style={{width: '100%', height: '100%'}} />
  </View>
);

const styles = StyleSheet.create({
  carouselItem: {
    marginLeft: wp('-1.5%'),
  },
  carouselContainer: {
    height: hp('32%'),
    width: wp('100%'),
  },
});

export default AdsCarousel;
