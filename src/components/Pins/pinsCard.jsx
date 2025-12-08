import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../theme/colors';
import { height } from '../../utils/constansts';
import { Edit, Edit2, Location, Trash } from 'iconsax-react-nativejs';
import { setColors } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { EDITPINS } from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';
const PinCards = ({ myLocations, index }) => {

  const navigation = useNavigation();

  const pinDelete = () => {

    // delete fireStore database
    firestore()
      .collection('Pins')
      .doc(pin?.id)
      .delete()
      .then(() => {
        Alert.alert("Pin deleted successfuly")
      }).catch((error) => {
        console.log(error)
      })
  }


  return (
    <View style={{
      backgroundColor: setColors(index),
      padding: 20,
      borderRadius: 10,
      marginVertical: 8

    }} >
      <View style={{ minHeight: height * 0.14, }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 20
        }}>{myLocations.title}</Text>
        <Text style={{
          fontSize: 18,
          marginVertical: 8,
          fontWeight: "300",
        }}>{myLocations.desc}</Text>
      </View>


      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text>{myLocations.date}</Text>

        <View style={{flexDirection:"row", }}>
          <TouchableOpacity
            onPress={() => navigation.navigate(EDITPINS, { myLocations: myLocations })}
            style={{ backgroundColor: Colors.BLACK, borderRadius: 100, padding: 8, marginHorizontal:5 }}>
            <Edit2 size={20} variant='Bold' color={Colors.WHITE} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => pinDelete()}
            style={{ backgroundColor: Colors.BLACK, borderRadius: 100, padding: 8, marginHorizontal:5 }}>
            <Trash size={20} variant='Bold' color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    fontSize: 20,
  },
});

export default PinCards; 