import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/ui/customInput';
import { Add, Calendar, NoteAdd, NoteText } from 'iconsax-react-nativejs';
import { screenStyle } from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';
import ImageContainer from '../../components/ui/imageContaine';
import ImagePicker from 'react-native-image-crop-picker'
import FloatActionButton from '../../components/ui/floatActionButton';
import Pins from '.';
import { MYLOCATIONS } from '../../utils/routes';
const EditPins = ({ route, navigation }) => {

    const { pin } = route?.params

    

    const [title, setTitle] = useState(pin?.title)
    const [desc, setDesc] = useState(pin?.desc)
    const [date, setDate] = useState(pin?.date)
    const [image, setImage] = useState(pin?.image)
    const [loading, setLoading] = useState(false)


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
        setLoading(true)
        const form = {
            title: title,
            desc: desc,
            date: date,
            image: image ? `data:${image.mime};base64,${image.data}` : null
        }
        // update fireStore database
        firestore()
            .collection('Locations')
            .doc(pin?.id)
            .update(form)
            .then(() => {
                Alert.alert("Pin edited successfuly")
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })

            navigation.navigate(MYLOCATIONS)
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
                    customStyle={{
                        right: 10,
                        bottom: 10
                    }}
                    icon={<Add />}
                />
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
                <CustomButton
                    loading={loading}
                    onPress={() => savePin()}
                    title="Edit Pin" />
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

export default EditPins;