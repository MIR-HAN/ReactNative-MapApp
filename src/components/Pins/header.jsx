import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { height } from '../../utils/constansts';
import CustomInpurComponent from '../ui/customInput';
import CustomInput from '../ui/customInput';
import { SearchNormal } from 'iconsax-react-nativejs';

const Header = () => {
  return (
    <View style={styles.container}>

      <View>
        <CustomInput
          placeholder="Search"
          icon={<SearchNormal color='#b2b2b2' />} />
      </View>

      <Text style={{
        fontSize: 35,
        fontWeight: "600",

      }}>Pins</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.09,
    justifyContent: "space-between",
   
  },
  text: {
    fontSize: 20,
  },
});

export default Header;