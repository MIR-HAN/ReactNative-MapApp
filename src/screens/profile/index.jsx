import React, { useEffect, useState } from 'react';
import { View, Text, } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/ui/avatar';
import { EDITPROFILE } from '../../utils/routes';
const Profile = ({navigation}) => {

  const [userData, setUserData] = useState()


  const getUserUid = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
   
      if (uid !== null) {
        getUserInfo(uid)
      }
    } catch (e) {
      console.log("save error", e)
    }
  };

  const removeUid= async()=>{
    try{
      await AsyncStorage.removeItem("uid")
    }catch(e){
  
    }
    Console.log("Done")
  }

  const getUserInfo = (userId) => {
    firestore()
      .collection("Users")
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setUserData(documentSnapshot.data())
      })
  }

  useEffect(() => {
    getUserUid()
  }, [])

  const signOut = () => {
    auth()
      .signOut()
      .then(() => 
      console.log("Done")
      )
      removeUid()
  }

  return (
    <View style={screenStyle.container}>

      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Avatar user={userData} />
      </View>

      <View style={{ alignItems: "center", flex: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>{userData?.name + " " + userData?.surname}</Text>
        <Text style={{ fontSize: 16, fontWeight: "200", marginVertical: 10 }} >{userData?.email}</Text>
      </View>

      <View style={{ paddingVertical: 20 }}>
        <CustomButton
        style={{backgroundColor:"red"}}
          onPress={() => navigation.navigate(EDITPROFILE, {user:userData})}
          title="Edit Profile" />

        <CustomButton
          onPress={() => signOut()}
          title="Sign Out" />
      </View>




    </View>


  );
};



export default Profile;