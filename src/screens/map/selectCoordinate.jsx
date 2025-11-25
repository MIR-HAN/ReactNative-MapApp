import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';
import { Add, ArrowRight, LocationAdd, Map1 } from 'iconsax-react-nativejs';
import FloatActionButton from '../../components/ui/floatActionButton';
import CustomMarker from '../../components/Map/CustomMarker';
import CustomCallout from '../../components/Map/CustomCallout';
import { Colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { ADDLOCATION, DETAIL, SELECTCOORDINATE } from '../../utils/routes';


const SelectCoordinate = ({ navigation }) => {

    const [currentPosition, setCurrentPosition] = useState(null)
    const [coordinate, setCoordinate] = useState(null)


    const getCurrentPosition = () => {

        Geolocation.getCurrentPosition(
            pos => {
                setCurrentPosition(pos.coords)
            },
            error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true },
        );
    };

    const handleSelectCoordinate = (e) => {
        setCoordinate(e.nativeEvent.coordinate)

    }

    useEffect(() => {

        getCurrentPosition();


    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <FloatActionButton
                    disabled={coordinate ? false : true}
                    onPress={() => navigation.navigate(ADDLOCATION,{coordinate:coordinate})}
                    icon={<ArrowRight size={22} color={Colors.WHITE} variant='Outline' />}
                    customStyle={{
                        right: 20,
                        bottom: 40,
                        backgroundColor: coordinate ? Colors.GREEN :Colors.GRAY
                    }}

                />

                <MapView
                    onPress={handleSelectCoordinate}
                    draggable
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={
                        {
                            latitude: currentPosition?.latitute,
                            longitude: currentPosition?.longitude,
                            latitudeDelta: currentPosition?.latitudeDelta,
                            longitudeDelta: currentPosition?.longitudeDelta
                        }
                    }
                >

                    <Marker
                        title="Your current location"
                        coordinate={
                            {
                                latitude: currentPosition?.latitude,
                                longitude: currentPosition?.longitude,
                                latitudeDelta: currentPosition?.latitudeDelta,
                                longitudeDelta: currentPosition?.longitudeDelta
                            }
                        }
                    />
                    {
                        coordinate && (
                            <Marker

                                coordinate={
                                    {
                                        latitude: coordinate?.latitude,
                                        longitude: coordinate?.longitude,
                                        latitudeDelta: coordinate?.latitudeDelta,
                                        longitudeDelta: coordinate?.longitudeDelta
                                    }
                                }
                            />)
                    }

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


export default SelectCoordinate;