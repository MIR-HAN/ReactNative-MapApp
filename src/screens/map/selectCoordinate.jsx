import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert, Text, Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { ArrowRight, Map1, InfoCircle } from 'iconsax-react-nativejs'; 
import FloatActionButton from '../../components/ui/floatActionButton';
import { Colors } from '../../theme/colors';
import { ADDLOCATION } from '../../utils/routes';

const SelectCoordinate = ({ navigation }) => {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [coordinate, setCoordinate] = useState(null);
    const [mapType, setMapType] = useState("standard");
    
    // State for managing instruction hint visibility and animation
    const [showHint, setShowHint] = useState(true);
    const fadeAnim = useState(new Animated.Value(0))[0]; // Initial value for opacity: 0

    useEffect(() => {
        getCurrentPosition();

        // Fade in the instruction hint when the component mounts
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Automatically hide the hint after 4 seconds
        const timer = setTimeout(() => {
            hideHint();
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    // Function to handle the fade-out animation of the hint
    const hideHint = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setShowHint(false));
    };

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            pos => {
                setCurrentPosition(pos.coords);
            },
            error => Alert.alert('Location Error', 'Please enable location services to see your position.'),
            { enableHighAccuracy: true },
        );
    };

    const handleSelectCoordinate = (e) => {
        setCoordinate(e.nativeEvent.coordinate);
        // If user interacts with the map, hide the hint immediately
        if (showHint) hideHint();
    };

    const changeMapType = () => {
        setMapType(prev => prev === "standard" ? "hybrid" : "standard");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                
                {/* INSTRUCTION POPUP (HINT) */}
                {showHint && (
                    <Animated.View style={[styles.hintContainer, { opacity: fadeAnim }]}>
                        <View style={styles.hintContent}>
                            <InfoCircle size={20} color={Colors.GREEN} variant="Bold" />
                            <Text style={styles.hintText}>Tap on the map to select a point</Text>
                        </View>
                    </Animated.View>
                )}

                {/* Map Type Toggle Button */}
                <FloatActionButton
                    onPress={changeMapType}
                    icon={<Map1 color={mapType === "standard" ? Colors.BLACK : Colors.GREEN} size={30} variant={mapType === "standard" ? "Outline" : "Bold"} />}
                    customStyle={{ top: 10, right: 25 }}
                />

                {/* Navigate to Add Location Button - Disabled until a coordinate is picked */}
                <FloatActionButton
                    disabled={!coordinate}
                    onPress={() => navigation.navigate(ADDLOCATION, { coordinate: coordinate })}
                    icon={<ArrowRight size={22} color={Colors.WHITE} variant='Outline' />}
                    customStyle={{
                        right: 20,
                        bottom: 40,
                        backgroundColor: coordinate ? Colors.GREEN : Colors.GRAY
                    }}
                />

                <MapView
                    onPress={handleSelectCoordinate}
                    mapType={mapType}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={currentPosition ? {
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    } : undefined}
                >
                    {/* User's current location marker */}
                    {currentPosition && (
                        <Marker
                            title="You are here"
                            coordinate={currentPosition}
                        />
                    )}
                    
                    {/* Selected location marker */}
                    {coordinate && (
                        <Marker 
                            coordinate={coordinate} 
                            pinColor={Colors.LOGOCOLOR} 
                        />
                    )}
                </MapView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    // Styles for the floating hint popup
    hintContainer: {
        position: 'absolute',
        top: 70, // Positioned below the top float button
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    hintContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent black
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        elevation: 5, // Shadow for Android
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    hintText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 10,
    }
});

export default SelectCoordinate;