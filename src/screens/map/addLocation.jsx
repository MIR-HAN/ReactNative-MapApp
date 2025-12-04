import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/ui/customInput';
import { Add, Calendar, CloudPlus, ElementPlus, NoteAdd, NoteText, Star1 } from 'iconsax-react-nativejs';
import { screenStyle } from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';
import ImageContainer from '../../components/ui/imageContaine';
import FloatActionButton from '../../components/ui/floatActionButton';
import ImagePicker from 'react-native-image-crop-picker'
import auth from "@react-native-firebase/auth"
import { TAB,} from '../../utils/routes';
const AddLocation = ({ route, navigation }) => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [point, setPoint] = useState("")
    const [image, setImage] = useState("")
    

    const { coordinate } = route?.params


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

        const user = auth().currentUser;

        setLoading(true)
        const form = {
            userId: user.uid,
    title: title || null,       // boşsa null
    desc: desc || null,
    point: point || null,
    date: date || null,
    coordinate: coordinate || null,
    image: image ? `data:${image.mime};base64,${image.data}` : null

        }

        firestore()
            .collection('Locations')
            .add(form)
            .then(() => {
                Alert.alert("Photo added successfuly")
            }).catch((error) => {

            }).finally(() => {
                setLoading(false)
            })

            navigation.navigate(TAB)

    }

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
              <ImageContainer image={image}  />
                <FloatActionButton 
                onPress={pickImage}
                customStyle={{
                    right:10,
                    bottom:10
                }}
                icon={<Add/>}
                />
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
                <CustomButton
                    loading={loading}
                    onPress={() => savePin()}
                    title="Add Location" />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {


    },
    text: {
        fontSize: 20,
    },
});

export default AddLocation;