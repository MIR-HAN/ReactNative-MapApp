import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Alert, RefreshControl } from 'react-native';
import FloatActionButton from '../../components/ui/floatActionButton';
import { Add } from 'iconsax-react-nativejs';
import { Colors } from '../../theme/colors';
import PinCards from '../../components/Pins/pinsCard';
import { screenStyle } from '../../styles/screenStyle';
import Header from '../../components/Pins/header';
import { ADDPIN, EDITPINS } from '../../utils/routes';
import LoadingModal from '../../components/ui/loadingModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FavoritesCard from '../../components/favorites/favoritesCard';

const Pins = ({ navigation }) => {

  const [myLocations, setMylocations] = useState([]);
  const [pending, setPending] = useState(true);

  const getMyLocations = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return
      await firestore()
        .collection("Locations")
        .where('userId', "==", auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          const fetchedMyLocations = [];

          querySnapshot.forEach((documentSnapshot) => {
            fetchedMyLocations.push({
              id: documentSnapshot.id,
              title: documentSnapshot.data()?.title,
              desc: documentSnapshot.data()?.desc,
              date: documentSnapshot.data()?.date,
              point: documentSnapshot.data()?.point,
              coordinate: documentSnapshot.data()?.coordinate,
              image: documentSnapshot.data()?.image,
            });
          });

          setMylocations(fetchedMyLocations);
        })
        .catch((error) => {
          Alert.alert("An error occurred");
        })
        .finally(() => {
          setPending(false);
        });
    } catch (error) {
      console.log(error);
      setPending(false);
    }
  };

 

  useEffect(() => {

    getMyLocations();

  }, [])

  return (
    <View style={screenStyle.container}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={"dark-content"} />
      {
        pending ?
          <LoadingModal visible={pending} />
          :
          <FlatList refreshControl={<RefreshControl refreshing={pending} onRefresh={getMyLocations} />}
          //  ListHeaderComponent={<Header />}
            data={myLocations}
            renderItem={({ item, index }) => <FavoritesCard 
            favorite={item} 
            index={index}
            showEdit={true}
            onEdit={()=>navigation.navigate(EDITPINS, {pin:item})}
            type="locations"
            />}
            keyExtractor={(item) => item.id}

          />
 
      }

     
    </View>
  );
};



export default Pins;