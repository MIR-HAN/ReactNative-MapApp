import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { PictureFrame } from 'iconsax-react-nativejs';
import { Colors } from '../../theme/colors';

const ImageContainer = ({ image, customStyle }) => {
  
  return (
    <View style={[styles.container, customStyle]}>
      {image ? (
        <Image
          style={styles.image}
          source={{ uri: image?.path ? image.path : image }}
        />
      ) : (
        <PictureFrame size={40} color={Colors.GRAY} variant="Bold" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageContainer;
