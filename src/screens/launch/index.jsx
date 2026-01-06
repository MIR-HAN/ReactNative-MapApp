import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity,} from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import { height, width } from '../../utils/constansts';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import { SIGNIN, SIGNUP } from '../../utils/routes';
import { Facebook, Google, Instagram } from 'iconsax-react-nativejs';
import * as Animatable from 'react-native-animatable';
import { useGuest } from '../../ContextApi/GuestModeContext';
import AboutModal from '../../components/ui/aboutModal';
const Launch = ({ navigation }) => {

  const { setIsGuest } = useGuest();
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  return (
    <SafeAreaView style={screenStyle.safeAreaView}>
      <View style={screenStyle.container}>

        <View style={{ flex: 2, justifyContent: "center", alignItems: "center", }}>
          <Image
            source={require("../../assets/images/MapleLaunchScreenAlter.png")}
            style={{ width: width, height: height * 0.4, resizeMode: "contain", alignSelf: "center" }}
          />
        </View>


        {/**/}

        <View style={{  justifyContent: "center", alignItems: "center", }}>
        

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 }}>
            {"Welcome to Mapple".split("").map((char, i) => (
              <Animatable.Text
                key={i}
                animation="fadeInLeft"
                delay={i * 50}
                duration={100}
                style={{ fontSize: 22, color: Colors.BLACK, fontWeight: '500' }}
              >
                {char}
              </Animatable.Text>
            ))}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {"Find Local, Eat Fresh".split("").map((char, i) => (
              <Animatable.Text
                key={i}
                animation="fadeInLeft"
                delay={i * 50 + 1000}
                duration={100}
                style={{ fontSize: 18, color: Colors.BLACK, fontStyle: 'italic' }}
              >
                {char}
              </Animatable.Text>
            ))}
          </View>
        </View>

        {/*** */}



        <View style={{ flex: 2, justifyContent: "center" }}>

          <View style={{ flex: 2, justifyContent: "center", marginVertical: 25 }}>
            <CustomButton
              onPress={() => navigation.navigate(SIGNIN)}
              title="Sign In" />
            <CustomButton
              onPress={() => navigation.navigate(SIGNUP)}
              title="Sign Up"
              style={{
                color: Colors.LOGOCOLOR
              }}
            />
            <CustomButton
              onPress={() => setIsGuest(true)}
              title="Continue as a Guest"
              style={{
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: Colors.LOGOCOLOR,
                marginTop: 15,
              }}
              textStyle={{
                color: Colors.LOGOCOLOR,
                fontWeight: "600",
                fontSize: 18
              }}
            />

          </View>



          <View style={{
            flex: 1, alignItems: "center", justifyContent: "center",
            marginTop: 15,
          }}>
            <TouchableOpacity onPress={() => setIsAboutVisible(true)}>
              <Text style={{ color: Colors.GRAY, textDecorationLine: 'underline', marginBottom: 10 }}>
                About Maple
              </Text>
            </TouchableOpacity>


            <View style={{
              width: 70,
              height: 70,
              backgroundColor: '#FFFFFF',
              elevation: 5, // Android 
            }}>
              <Image
                source={require("../../assets/images/playstore.png")}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
              />
            </View>

            <AboutModal
              visible={isAboutVisible}
              onClose={() => setIsAboutVisible(false)}
            />

          </View>



          {  /* <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 10, flex: 1 }}>
            /*
            <Text style={{ fontSize: 14, color: Colors.GRAY, marginBottom: 5, }}>Sign Up Using</Text>

            <View style={{ flexDirection: "row", paddingVertical: 10 }}>
              <Google size="32" variant='Bold' color={Colors.GOOGLE} />
              <Facebook size="32" variant='Bold' color={Colors.FACEBOOK} style={{ marginLeft: 10 }} />
              <Instagram size="32" color={Colors.INSTAGRAM} style={{ marginLeft: 10 }} />
            </View>
          

          </View>  */}




        </View >

      </View>
    </SafeAreaView>
  );
};


export default Launch;