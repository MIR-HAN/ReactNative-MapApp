import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';

const FloatActionButton = (props) => {
const {icon,customStyle}=props

  return (
    <TouchableOpacity
   
    {...props} style={[styles.container, customStyle]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: "absolute",
    zIndex: 99,
    backgroundColor:Colors.WHITE,
    width: 60,
    height: 60,
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17, // shadow for android
  
  },
  text: {
    fontSize: 20,
  },
});

export default FloatActionButton;