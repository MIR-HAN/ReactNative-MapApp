import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Alert, RefreshControl } from 'react-native';
import FloatActionButton from '../../components/ui/floatActionButton';
import { Add } from 'iconsax-react-nativejs';
import { Colors } from '../../theme/colors';
import PinCards from '../../components/Pins/pinsCard';
import { screenStyle } from '../../styles/screenStyle';
import Header from '../../components/Pins/header';
import { ADDPIN } from '../../utils/routes';
import LoadingModal from '../../components/ui/loadingModal';
import firestore from '@react-native-firebase/firestore';
import FavoritesCard from '../../components/favorites/favoritesCard';
import auth from "@react-native-firebase/auth"
const Favorites = ({ navigation }) => {

  const [favorites, setFavorites] = useState([]);
  const [pending, setPending] = useState(true);

  const getFavorites = async () => {

    setPending(true)

    const user = auth().currentUser;
    
   await firestore()
      .collection("Favorites")
      .where('userId', '==', user.uid)
      .get()
      .then(querySnapshot => {

        const fetchedPins = [];

        querySnapshot.forEach((documentSnapshot) => {

          fetchedPins.push({
            id: documentSnapshot.id,
            title: documentSnapshot.data()?.title,
            desc: documentSnapshot.data()?.desc,
            date: documentSnapshot.data()?.date,
            image: documentSnapshot.data()?.image,
            point:documentSnapshot.data()?.point,
            coordinate:documentSnapshot.data(),
          })
        })

        setFavorites(fetchedPins)
      }).catch((error) => {
        Alert.alert("An error accured")
      }).finally(() => {
        setPending(false)
      })
  }

  useEffect(() => {

    getFavorites();

  }, [])

  return (
    <View style={screenStyle.container}>
      <StatusBar backgroundColor={Colors.BLACK} barStyle={"dark-content"} />
      {
        pending ?
          <LoadingModal visible={pending} />
          :
          <FlatList refreshControl={<RefreshControl refreshing={pending} onRefresh={getFavorites} />}
            data={favorites}
            renderItem={({ item, index }) => <FavoritesCard
             favorite={item}
              index={index} 
              showEdit={false}
              type="favorites"
              />}
            keyExtractor={(item) => item?.id}

          />

      }

   
    </View>
  );
};



export default Favorites;