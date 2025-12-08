import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';
import { Add, LocationAdd, Map1 } from 'iconsax-react-nativejs';
import FloatActionButton from '../../components/ui/floatActionButton';
import CustomMarker from '../../components/Map/CustomMarker';
import CustomCallout from '../../components/Map/CustomCallout';
import { Colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { DETAIL, SELECTCOORDINATE } from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
const Map = ({ navigation }) => {

  const [currentPosition, setCurrentPosition] = useState(null)

  const [mapType, setMapType] = useState("standard")

  const [locations, setLocations] = useState([]) 



  const getLocations = () => {
    // Firestore realtime listener
    const subscriber = firestore()
      .collection("Locations")
      .onSnapshot(querySnapshot => {
        const fetchedLocations = [];
  
        querySnapshot.forEach(documentSnapshot => {
          fetchedLocations.push({
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            desc: documentSnapshot.data().desc,
            date: documentSnapshot.data().date,
            point: documentSnapshot.data().point,
            coordinate: documentSnapshot.data().coordinate,
            image: documentSnapshot.data().image,
            userId: documentSnapshot.data().userId,
          });
        });
  
        setLocations(fetchedLocations);
      }, error => {
        Alert.alert("An error occurred while fetching locations");
      });
  
    return subscriber; // return for clean up
  };
  

  const changeMapType = () => {
    if (mapType === "standard") {
      setMapType("hybrid");
    } else {
      setMapType("standard");
    }
  }


  const getCurrentPosition = () => {

    Geolocation.getCurrentPosition(
      pos => {
        setCurrentPosition(pos.coords)
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
  };


  useEffect(() => {

    getCurrentPosition();

    const unsubscribe = getLocations(); // start listener
    return () => unsubscribe();          // cleanup


  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <FloatActionButton
          onPress={() => changeMapType()}
          icon={<Map1 color={mapType == "standard" ? Colors.BLACK : Colors.GREEN} size={30} variant={mapType == "standard" ? "Outline" : "Bold"} />}
          customStyle={{
            top: 10,
            right: 25
          }}
        />

        <FloatActionButton
          onPress={() => navigation.navigate(SELECTCOORDINATE)}

          icon={<LocationAdd size={22} color={Colors.WHITE} variant='Outline' />}
          customStyle={{
            right: 20,
            bottom: 40,
            backgroundColor: Colors.GREEN
          }}

        />

        <MapView
          mapType={mapType}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={
            {
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
              latitudeDelta: currentPosition?.latitudeDelta,
              longitudeDelta: currentPosition?.longitudeDelta
            }
          }
        >
          {
            locations.map((markers) => (
              <Marker
                key={markers.id}
                title={markers.title}
                description={markers.description}
                coordinate={markers.coordinate}
              >

                <CustomMarker  isOwner={markers.userId === auth().currentUser.uid}/>

                <Callout
                  tooltip={true}
                  onPress={() => navigation.navigate(DETAIL, { item: markers })}
                >
                  <CustomCallout title={markers.title}
                    description={markers.desc} point={markers.point} image={markers.image} />
                </Callout>


              </Marker>
            ))
          }

          <Marker
            title="Your current location"
            coordinate={
              {
                latitude: currentPosition?.latitute,
                longitude: currentPosition?.longitude,
                latitudeDelta: currentPosition?.latitudeDelta,
                longitudeDelta: currentPosition?.longitudeDelta
              }
            }
          />

        </MapView>



      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default Map;