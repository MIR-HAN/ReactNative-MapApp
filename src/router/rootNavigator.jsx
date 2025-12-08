
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ADDLOCATION, ADDPIN, DETAIL, EDITPINS, EDITPROFILE, HOME, LAUNCH, PINS, SELECTCOORDINATE, SIGNIN, SIGNUP, TAB } from '../utils/routes';
import Home from '../screens/map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from '../screens/detail';
import Pins from '../screens/pins';
import AddPins from '../screens/pins/addPins';
import EditPins from '../screens/pins/editPins';
import Launch from '../screens/launch';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import auth from "@react-native-firebase/auth"
import { LogoutCurve } from 'iconsax-react-nativejs';
import { Colors } from '../theme/colors';
import TabNavigator from './tabNavigation';
import SelectCoordinate from '../screens/map/selectCoordinate';
import AddLocation from '../screens/map/addLocation';
import ProfileUpdate from '../screens/profile/profileUpdate';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false)
  }

  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) return null;

 
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "Back"
      }}
    >

      {
        !user ?
          (<Stack.Group>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name={LAUNCH} component={Launch} />
            <Stack.Screen name={SIGNIN} component={SignIn} />
            <Stack.Screen name={SIGNUP} component={SignUp} />
          </Stack.Group>)
          :
          (<Stack.Group>

           <Stack.Screen
           options={{
            headerShown:false
           }}
           name={TAB} component={TabNavigator}/>
          
            <Stack.Screen name={EDITPINS} component={EditPins} />
            <Stack.Screen name={DETAIL} component={Detail} />
            <Stack.Screen name={SELECTCOORDINATE} component={SelectCoordinate} />
            <Stack.Screen name={ADDLOCATION} component={AddLocation} />
            <Stack.Screen name={EDITPROFILE} component={ProfileUpdate} />


          </Stack.Group>)

      }


    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default RootNavigator;