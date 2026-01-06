import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { screenStyle } from '../../styles/screenStyle';
import LoadingModal from '../../components/ui/loadingModal';
import firestore from '@react-native-firebase/firestore';
import FavoritesCard from '../../components/favorites/favoritesCard';
import auth from "@react-native-firebase/auth";
import { useGuest } from '../../ContextApi/GuestModeContext';  
import CustomButton from '../../components/ui/customButton'; 
import { HeartSlash } from 'iconsax-react-nativejs'; 

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [pending, setPending] = useState(true);
  const { setIsGuest } = useGuest(); 
  const user = auth().currentUser;

  const getFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setPending(false);
      return;
    }

    setPending(true);
    try {
      const querySnapshot = await firestore()
        .collection("Favorites")
        .where('userId', '==', user.uid)
        .get();

      const fetchedPins = [];
      querySnapshot.forEach((documentSnapshot) => {
        fetchedPins.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setFavorites(fetchedPins);
    } catch (error) {
      Alert.alert("An error occurred");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    getFavorites();
  }, [user]); // update the list when user changed

 
  if (!user) {
    return (
      <View style={[screenStyle.container, styles.center]}>
        <HeartSlash size={80} color={Colors.GRAY} variant="Outline" />
        <Text style={styles.title}>Login Required</Text>
        <Text style={styles.description}>
          Please sign in to save and view your favorite locations.
        </Text>
        <View style={{ width: '80%', marginTop: 20 }}>
          <CustomButton 
            title="Sign In / Register" 
            onPress={() => setIsGuest(false)} 
          />
        </View>
      </View>
    );
  }

  return (
    <View style={screenStyle.container}>
      <StatusBar backgroundColor={Colors.BLACK} barStyle={"dark-content"} />
      {pending ? (
        <LoadingModal visible={pending} />
      ) : (
        <FlatList
          refreshControl={<RefreshControl refreshing={pending} onRefresh={getFavorites} />}
          data={favorites}
          ListEmptyComponent={() => (
             <View style={styles.center}>
                <Text style={styles.description}>You haven't added any favorites yet.</Text>
             </View>
          )}
          renderItem={({ item, index }) => (
            <FavoritesCard
              favorite={item}
              index={index}
              showEdit={false}
              type="favorites"
            />
          )}
          keyExtractor={(item) => item?.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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

export default Favorites;