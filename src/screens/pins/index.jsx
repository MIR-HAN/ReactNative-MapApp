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

  const getMyLocations = () => {
    const user = auth().currentUser;
    if (!user) return;
  
    const subscriber = firestore()
      .collection("Locations")
      .where('userId', '==', user.uid)
      .onSnapshot(snapshot => {
        const fetched = [];
        snapshot.forEach(doc => {
          fetched.push({ id: doc.id, ...doc.data() });
        });
        setMylocations(fetched);
        setPending(false);
      });
  
    return subscriber; // cleanup için dönebilirsin
  };
  
  useEffect(() => {
    const subscriber = getMyLocations();
  
    return () => subscriber && subscriber(); // component unmount cleanup
  }, []);
  
 

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