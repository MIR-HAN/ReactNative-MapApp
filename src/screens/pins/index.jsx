import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, RefreshControl } from 'react-native';
import { Colors } from '../../theme/colors';
import { screenStyle } from '../../styles/screenStyle';
import LoadingModal from '../../components/ui/loadingModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FavoritesCard from '../../components/favorites/favoritesCard';
import { EDITPINS } from '../../utils/routes';
import { useGuest } from '../../ContextApi/GuestModeContext'; 
import CustomButton from '../../components/ui/customButton'; 
import { Map1 } from 'iconsax-react-nativejs'; 

const Pins = ({ navigation }) => {
  const [myLocations, setMylocations] = useState([]);
  const [pending, setPending] = useState(true);
  const { setIsGuest } = useGuest(); 
  const user = auth().currentUser; 

  const getMyLocations = () => {
    if (!user) {
      setPending(false);
      return;
    }
  
    const subscriber = firestore()
      .collection("Locations")
      .where('userId', '==', user.uid)
      .onSnapshot(snapshot => {
        const fetched = [];
        if (snapshot) {
            snapshot.forEach(doc => {
              fetched.push({ id: doc.id, ...doc.data() });
            });
        }
        setMylocations(fetched);
        setPending(false);
      }, (error) => {
        console.log("Firestore Error:", error);
        setPending(false);
      });
  
    return subscriber;
  };
  
  useEffect(() => {
    const subscriber = getMyLocations();
    return () => subscriber && subscriber(); 
  }, [user]);

  // GİRİŞ YAPMAMIŞ KULLANICI GÖRÜNÜMÜ
  if (!user) {
    return (
      <View style={[screenStyle.container, styles.center]}>
        <Map1 size={80} color={Colors.GRAY} variant="Outline" />
        <Text style={styles.title}>My Locations</Text>
        <Text style={styles.description}>
            You need to be logged in to create and manage your own locations.
        </Text>
        <View style={{ width: '80%', marginTop: 20 }}>
          <CustomButton title="Sign In" onPress={() => setIsGuest(false)} />
        </View>
      </View>
    );
  }

  return (
    <View style={screenStyle.container}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={"dark-content"} />
      {pending ? (
        <LoadingModal visible={pending} />
      ) : (
        <FlatList 
          refreshControl={<RefreshControl refreshing={pending} onRefresh={getMyLocations} />}
          data={myLocations}
          ListEmptyComponent={() => (
            <View style={styles.center}>
               <Text style={styles.description}>You haven't added any locations yet.</Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <FavoritesCard 
              favorite={item} 
              index={index}
              showEdit={true}
              onEdit={() => navigation.navigate(EDITPINS, { pin: item })}
              type="locations"
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

// EKSİK OLAN STİLLER:
const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: Colors.WHITE
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.BLACK,
      marginTop: 15,
    },
    description: {
      fontSize: 16,
      color: Colors.GRAY,
      textAlign: 'center',
      marginTop: 10,
    },
  });

// EKSİK OLAN EXPORT:
export default Pins;