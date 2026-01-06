import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/ui/customInput';
import { Add, Calendar, NoteAdd, NoteText, Star1, UserSquare } from 'iconsax-react-nativejs';
import { screenStyle } from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';
import ImageContainer from '../../components/ui/imageContaine';
import FloatActionButton from '../../components/ui/floatActionButton';
import ImagePicker from 'react-native-image-crop-picker';
import auth from "@react-native-firebase/auth";
import { TAB } from '../../utils/routes';
import { useGuest } from '../../ContextApi/GuestModeContext';

const AddLocation = ({ route, navigation }) => {
    // Get current user globally within the component to handle both UI conditional rendering and logic
    const user = auth().currentUser;

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [point, setPoint] = useState("");
    const [image, setImage] = useState("");
    const { setIsGuest } = useGuest();

    const { coordinate } = route?.params || {};

    const pickImage = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            includeBase64: true,
        }).then(img => {
            setImage(img);
        }).catch(err => {
            console.log("Image pick error: ", err);
        });
    };

    const savePin = () => {
        // Double check user existence before proceeding with Firestore write
        if (!user) {
            Alert.alert("Error", "User session not found.");
            return;
        }

        setLoading(true);
        const form = {
            userId: user.uid,
            title: title || null,       
            desc: desc || null,
            point: point || null,
            date: date || null,
            coordinate: coordinate || null,
            image: image ? `data:${image.mime};base64,${image.data}` : null
        };

        firestore()
            .collection('Locations')
            .add(form)
            .then(() => {
                Alert.alert("Success", "Location added successfully");
                navigation.navigate(TAB);
            }).catch((error) => {
                console.log("Firestore error: ", error);
                Alert.alert("Error", "Something went wrong while saving.");
            }).finally(() => {
                setLoading(false);
            });
    };

   
    if (!user) {
        return (
            <View style={[screenStyle.container, styles.center]}>
                <UserSquare size={80} color={"#808080"} variant="Outline" />
                <Text style={styles.title}>Guest Mode</Text>
                <Text style={styles.description}>
                    You must be logged in to add a location.
                </Text>
                <View style={{ width: '80%', marginTop: 20 }}>
                    <CustomButton 
                        title="Login / Register" 
                        onPress={() => setIsGuest(false)} 
                    />
                </View>
            </View>
        );
    }

    // Main UI: Shown only to authenticated users
    return (
        <View style={screenStyle.container}>
            <CustomInput
                onChangeText={(value) => setTitle(value)}
                value={title}
                inputTitle="Title"
                placeholder="Title"
                icon={<NoteAdd color={"#b2b2b2"} />}
            />
            
            <CustomInput
                onChangeText={(value) => setDesc(value)}
                value={desc}
                inputTitle="Description"
                placeholder="Description"
                icon={<NoteText color={"#b2b2b2"} />}
            />

            <CustomInput
                onChangeText={(value) => setPoint(value)}
                value={point}
                inputTitle="Point"
                placeholder="Point"
                icon={<Star1 color={"#b2b2b2"} />}
            />

            <CustomInput
                onChangeText={(value) => setDate(value)}
                value={date}
                inputTitle="Date"
                placeholder="Date"
                icon={<Calendar color={"#b2b2b2"} />}
            />

            <View style={{ flex: 1, justifyContent: "center" }}>
                <ImageContainer image={image} />
                <FloatActionButton
                    onPress={pickImage}
                    customStyle={{ right: 10, bottom: 10 }}
                    icon={<Add />}
                />
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
                <CustomButton
                    loading={loading}
                    onPress={savePin}
                    title="Add Location" 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10
    },
    description: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 10
    }
});

export default AddLocation;