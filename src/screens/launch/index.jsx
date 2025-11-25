import React, { useEffect } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import { height, width } from '../../utils/constansts';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import { SIGNIN, SIGNUP } from '../../utils/routes';
import { Facebook, Google, Instagram } from 'iconsax-react-nativejs';
import * as Animatable from 'react-native-animatable';
const Launch = ({ navigation }) => {

  return (
    <SafeAreaView style={screenStyle.safeAreaView}>
      <View style={screenStyle.container}>

        <View style={{ flex: 2, }}>
          <Image
            source={require("../../assets/images/launch.png")}
            style={{ width: width - 20, height: height * 0.35, resizeMode: "contain" }}
          />
        </View>


 {/*** */}

 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  <Text style={{ fontSize: 35, fontWeight: "bold", color: Colors.GREEN, marginBottom: 10 }}>
    Hello
  </Text>

  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 5 }}>
    {"Welcome to Mapple".split("").map((char, i) => (
      <Animatable.Text
        key={i}
        animation="fadeInLeft"
        delay={i * 50}   
        duration={100}
        style={{ fontSize: 18, color: Colors.BLACK, fontWeight: '500' }}
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

          <View style={{ flex: 1, justifyContent: "center" }}>
            <CustomButton
              onPress={() => navigation.navigate(SIGNIN)}
              title="Sing In" />
            <CustomButton
              onPress={() => navigation.navigate(SIGNUP)}
              title="Sign Up" />

          </View>

          <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 10, flex: 1 }}>
            <Text style={{ fontSize: 14, color: Colors.GRAY, marginBottom: 5, }}>Sign Up Using</Text>

            <View style={{ flexDirection: "row", paddingVertical: 10 }}>
              <Google size="32" variant='Bold' color={Colors.GOOGLE} />
              <Facebook size="32" variant='Bold' color={Colors.FACEBOOK} style={{ marginLeft: 10 }} />
              <Instagram size="32" color={Colors.INSTAGRAM} style={{ marginLeft: 10 }} />
            </View>

          </View>




        </View >

      </View>
    </SafeAreaView>
  );
};


export default Launch;