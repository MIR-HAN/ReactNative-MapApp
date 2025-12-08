import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Location } from 'iconsax-react-nativejs';
import { Colors } from '../../theme/colors';

const CustomMarker = ({isOwner}) => {
  return (
    <View >
    <Location  size="40" color={isOwner ? Colors.GREEN : Colors.BLUE} variant="Bold"/>
    </View>
  );
};




export default CustomMarker;