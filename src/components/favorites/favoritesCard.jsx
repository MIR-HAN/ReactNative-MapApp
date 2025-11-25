import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../theme/colors';
import { height } from '../../utils/constansts';
import { Edit, Edit2, Star, Trash } from 'iconsax-react-nativejs';
import { setColors } from '../../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { DETAIL, EDITPINS } from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';
import ImageContainer from '../ui/imageContaine';
const FavoritesCard = ({ favorite, index, showEdit = false, onEdit, onDelete,type }) => {

  const navigation = useNavigation();

  const handleDelete = () => {
    if (type === 'locations') {
      firestore()
        .collection('Locations')
        .doc(favorite.id)
        .delete()
        .then(() => Alert.alert('Location deleted successfully'));
    } else if (type === 'favorites') {
      firestore()
        .collection('Favorites')
        .doc(favorite.id)
        .delete()
        .then(() => Alert.alert('Favorite deleted successfully'));
    }
  };


  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(DETAIL, { item: favorite })}
      style={{
        borderWidth: 1.5,
        borderColor: Colors.SOFTGRAY,
        padding: 8,
        borderRadius: 10,
        marginVertical: 8,
        width: "100%",
        height: 250,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1. },
        shadowOpacity: 0.1,
        shadowRadius: 3,

        // Shadow android
        elevation: 5,

      }} >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
        <Text style={{
          fontWeight: "500",
          fontSize: 16
        }}>{favorite?.title}</Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Star size={20} color={Colors.STAR_YELLOW} variant="Bold" />
          <Text style={{
            fontWeight: '500',
            fontSize: 15,
            color: Colors.GRAY,
            flexShrink: 1,
          }}>{favorite.point}</Text>
        </View>
      </View>

      <View style={{ width: '100%', height: 90, marginVertical: 5, }}>
        <ImageContainer customStyle={{
          width: "100%",
          height: 170
        }} image={favorite.image} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", top: 80 }}>
        <Text>{favorite?.date}</Text>

        <View style={{ flexDirection: "row", }}>


          {showEdit && <TouchableOpacity
            onPress={onEdit}
            style={{ backgroundColor: Colors.GRAY, borderRadius: 100, padding: 8, }}>
            <Edit2 size={15} variant='Bold' color={Colors.WHITE} />
          </TouchableOpacity>
          }
          <TouchableOpacity
            onPress={handleDelete}
            style={{ backgroundColor: Colors.GRAY, borderRadius: 100, padding: 8, }}>
            <Trash size={15} variant='Bold' color={Colors.WHITE} />
          </TouchableOpacity>


        </View>

      </View>



    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,

  },
  text: {
    fontSize: 20,
  },
});

export default FavoritesCard; 