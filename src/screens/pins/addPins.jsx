import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../../components/ui/customInput';
import { Calendar, NoteAdd, NoteText } from 'iconsax-react-nativejs';
import { screenStyle } from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';

const AddPins = () => {

    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [date, setDate] = useState(null)
    const [loading, setLoading]=useState(false)

    const savePin = () => {
        setLoading(true)
        const form = {
            title: title,
            desc: desc,
            date: date,
        }

       firestore()
          .collection('Pins')
          .add(form)
         .then(() => {
            Alert.alert("Pin added successfuly")
           }).catch((error)=>{
          
           }).finally(()=>{
            setLoading(false)
           })

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
                <CustomButton
                loading={loading}
                    onPress={() => savePin()}
                    title="Add Pin" />
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

export default AddPins;