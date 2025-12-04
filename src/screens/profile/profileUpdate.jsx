import React, { useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import { height, width } from '../../utils/constansts';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import auth from "@react-native-firebase/auth";
import CustomInput from '../../components/ui/customInput';
import { Bag, Bag2, EmojiNormal, EmptyWalletTime, Key, Message, Sms, User } from 'iconsax-react-nativejs';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/ui/avatar';
import { PROFILE } from '../../utils/routes';


const ProfileUpdate = ({ route, navigation }) => {

    const { user } = route?.params

    const [email, setEmail] = useState(user?.email)
    const [name, setName] = useState(user?.name)
    const [surname, setSurname] = useState(user?.surname)
    const [userType, setUserType] = useState(user?.userType)
    const [image, setImage] = useState(user?.image)
    const [loading, setLoading] = useState(false)



    const updateUser = () => {
        setLoading(true)
        const form = {
            name: name || '',
            surname: surname || '',  
            image: image || '',
            userType: userType,
          };
          
        firestore()
            .collection('Users')
            .doc(user?.userId)
            .update(form)
            .then(() => {
               Alert.alert("User updated successfuly")
            }).catch((error) => {

            }).finally(()=>{
                setLoading(false)
            })

            navigation.navigate(PROFILE)
    }


    return (
        <SafeAreaView style={screenStyle.safeAreaView}>
            <ScrollView style={screenStyle.container} contentContainerStyle={{ padding: 20 }}>

                <View style={{ flex: 2, }}>
                    <Avatar 
                    select={true}
                    user={user}
                    onChangeImage={(image,mimType)=>{
                      setImage(`data:${mimType};base64,${image}`)
                     
                    }}
                    />
                </View>

                <View style={{ flex: 3, justifyContent: "center", }}>

                    <CustomInput
                    editable={false}
                        icon={<Sms color={Colors.BLACK} variant='Bold' />}
                        onChangeText={(value => setEmail(value))}
                        value={email} inputTitle={"Email"} placeholder="Email" />


                    <CustomInput
                        icon={<User color={Colors.BLACK} variant='Bold' />}
                        onChangeText={(value => setName(value))}
                        value={name} inputTitle={"Name"} placeholder="Name" />

                    <CustomInput
                        icon={<User color={Colors.BLACK} variant='Bold' />}
                        onChangeText={(value => setSurname(value))}
                        value={surname} inputTitle={"Surname"} placeholder="Surname" />

                    <CustomInput
                        icon={<User color={Colors.BLACK} variant='Bold' />}
                        onChangeText={(value => setUserType(value))}
                        value={userType} inputTitle={"User Type"} placeholder="User Type" />


                </View>

                <View style={{ flex: 1, justifyContent: "center" }}>

                    <View style={{ marginVertical: 20, justifyContent: "center" }}>
                        <CustomButton
                            loading={loading}
                            onPress={() => updateUser()}
                            title="Update" />

                    </View>
                </View >

            </ScrollView>
        </SafeAreaView>
    );
};


export default ProfileUpdate;