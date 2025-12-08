import React, { useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import { height, width } from '../../utils/constansts';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import auth from "@react-native-firebase/auth";
import CustomInput from '../../components/ui/customInput';
import { Bag, Bag2, EmojiNormal, EmptyWalletTime, Key, Message, Sms, User, UserTag } from 'iconsax-react-nativejs';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [userType, setUserType] = useState("")
  const [loading, setLoading] = useState(false)


  const setUserUid = async (id) => {
    try {
      await AsyncStorage.setItem('uid', id);
    } catch (e) {
      // saving error
    }
  };
123
  const saveUser = (userId) => {

const form ={
  userId:userId,
  name:name,
  surname:surname,
  userType:userType,
  email:email,
}

    firestore()
      .collection('Users')
      .doc(userId)
      .set(form)
      .then(() => {
        console.log("user added successfuly")
      }).catch((error) => {

      })
  }


  const handleSingUp = () => {

    // ---- REQUIRED FIELDS ----
    if (!email.trim()) {
      Alert.alert("Email is required");
      return;
    }
  
    if (!password.trim()) {
      Alert.alert("Password is required");
      return;
    }
  
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters");
      return;
    }
  
    if (!name.trim()) {
      Alert.alert("Name is required");
      return;
    }
  
    // ---- OPTIONAL FIELDS ----
    const safeSurname = surname || "";
    const safeUserType = userType || "";
  
    setLoading(true);
  
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        
        // Firestore'a zorunlu + opsiyonel alanları kaydet
        const form = {
          userId: response.user.uid,
          name: name,
          surname: safeSurname,      // boşsa ""
          userType: safeUserType,    // boşsa ""
          email: email,
        };
  
        firestore()
          .collection("Users")
          .doc(response.user.uid)
          .set(form);
  
        setUserUid(response.user.uid);
        Alert.alert("User account created successfully");
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email is already in use");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Invalid email format");
        } else {
          Alert.alert("Error:", error.message);
        }
      })
      .finally(() => setLoading(false));
  };
  

  return (
    <SafeAreaView style={screenStyle.safeAreaView}>
      <ScrollView style={screenStyle.container} contentContainerStyle={{padding:20}}>

        <View style={{ flex: 2, }}>
          <Image
            source={require("../../assets/images/signIn.png")}
            style={{ width: width - 70, height: height * 0.35, resizeMode: "contain" }}
          />
        </View>

        <View style={{ flex: 3, justifyContent: "center", }}>
          <Text style={{ fontSize: 35, fontWeight: "bold", color: Colors.BLACK, marginVertical: 10, textAlign: "center" }}>Sign Up</Text>

          <CustomInput
            icon={<Sms color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setEmail(value))}
            value={email} inputTitle={"Email"} placeholder="Email" />
          <CustomInput
            icon={<Key color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setPassword(value))}
            value={password} secureTextEntry inputTitle={"Password"} placeholder="Password" />

          <CustomInput
            icon={<User color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setName(value))}
            value={name}  inputTitle={"Name"} placeholder="Name" />

          <CustomInput
            icon={<User color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setSurname(value))}
            value={surname} optional={true} inputTitle={"Surname"} placeholder="Surname" />

          <CustomInput
            icon={<UserTag color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setUserType(value))}
            value={userType} optional={true}  inputTitle={"User Type"} placeholder="User Type" />

        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>

          <View style={{marginVertical:20, justifyContent: "center" }}>
            <CustomButton
              loading={loading}
              onPress={() => handleSingUp()}
              title="Sing Up" />

          </View>
        </View >

      </ScrollView>
    </SafeAreaView>
  );
};


export default SignUp;