import React, { useState } from 'react';
import { View, Image, Text, SafeAreaView, Alert } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import { height, width } from '../../utils/constansts';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import auth from "@react-native-firebase/auth"
import CustomInput from '../../components/ui/customInput';
import { Key, User } from 'iconsax-react-nativejs';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignIn = ({ navigation }) => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState( )
  const [loading, setLoading] = useState(false)

  const setUserUid = async (id) => {
    try {
      await AsyncStorage.setItem('uid', id);
    } catch (e) {
      // saving error
   }
  };

  const handleSingIn = () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }
    setLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log("usersign in")
        setUserUid(data.user.uid)
      }).catch(error => {
        if (error.code === "auth/user-not-found") {
          Alert.alert("No account found for this email. Please sign up first.");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Incorrect password. Please try again.");
        } else if (error.code === "auth/invalid-email") {
          Alert.alert("Invalid email format. Please check your email address.");
        } else {
         
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (
    <SafeAreaView style={screenStyle.safeAreaView}>
      <View style={screenStyle.container}>

        <View style={{ flex: 3, }}>
          <Image
            source={require("../../assets/images/signIn.png")}
            style={{ width: width - 70, height: height * 0.35, resizeMode: "contain" }}
          />
        </View>

        <View style={{ flex: 3, justifyContent: "center", }}>
          <Text style={{ fontSize: 35, fontWeight: "bold", color: Colors.BLACK, marginBottom: 20, textAlign: "center" }}>Sign In</Text>

          <CustomInput
            icon={<User color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setEmail(value))}
            value={email}
            inputTitle={"Email"} placeholder="Email" />
          <CustomInput
            icon={<Key color={Colors.BLACK} variant='Bold' />}
            onChangeText={(value => setPassword(value))}
            value={password}
            inputTitle={"Password"} placeholder="Password" secureTextEntry />

        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomButton
              loading={loading}
              onPress={() => handleSingIn()}
              title="Sing In" />

          </View>
        </View >

      </View>
    </SafeAreaView>
  );
};


export default SignIn;