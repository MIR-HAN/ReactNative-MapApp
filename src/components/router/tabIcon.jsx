import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Map, Profile, Bookmark2, Heart, Location } from 'iconsax-react-nativejs';
import { PROFILE,FAVORITES,MAP,PINS, MYLOCATIONS } from '../../utils/routes';


const TabIcon = ({ name, focused, color, size }) => {
    if (name === MAP) {
      return (
        <Map
          color={color}
          size={size}
          variant={focused ? 'Bold' : 'Outline'}
        />
      );
    } else if (name === PROFILE) {
      return (
        <Profile
          color={color}
          size={size}
          variant={focused ? 'Bold' : 'Outline'}
        />
      );
    } else if (name === MYLOCATIONS) {
      return (
        < Location
          color={color}
          size={size}
          variant={focused ? 'Bold' : 'Outline'}
        />
      );
    } else if (name === FAVORITES) {
      return (
        <Heart
          color={color}
          size={size}
          variant={focused ? 'Bold' : 'Outline'}
        />
      );
    } else {
      return null;
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default TabIcon;
