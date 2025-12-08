import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { height } from '../../utils/constansts';
import { Colors } from '../../theme/colors';

const CustomButton = (props) => {
  const {loading,title, style}=props
  return (
    <TouchableOpacity
    disabled={loading}
    {...props} style={[
      styles.container,
      loading ? styles.disableButton : styles.activeButton,
      style
      ]}>

{
  loading?
  <ActivityIndicator size={"small"} color={Colors.WHITE}/>
  : 
  <Text style={{fontWeight:"bold",fontSize:20, color:Colors.WHITE}}>{title}</Text>
}

     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    
   backgroundColor:Colors.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    height:height*0.06,
    borderRadius:50,
    marginVertical:5

  },

});

export default CustomButton;