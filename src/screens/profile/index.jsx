import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import CustomButton from '../../components/ui/customButton';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Avatar from '../../components/ui/avatar';
import { EDITPROFILE } from '../../utils/routes';
import { useGuest } from '../../ContextApi/GuestModeContext';
import { UserSquare, Trash } from 'iconsax-react-nativejs';
import { Colors } from '../../theme/colors';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const { setIsGuest } = useGuest();
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      getUserInfo(user.uid);
    }
  }, [user]);

  const getUserInfo = (userId) => {
    const subscriber = firestore()
      .collection("Users")
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot?.exists) {
          setUserData(documentSnapshot.data());
        }
      });
    return () => subscriber();
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem("uid");
    } catch (e) {
      console.log("Signout error", e);
    }
  };

  // APPLE İÇİN KRİTİK: HESAP SİLME FONKSİYONU
  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account permanently? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete My Account", 
          style: "destructive", 
          onPress: async () => {
             try {
               // 1. Veritabanındaki kullanıcı bilgilerini sil
               await firestore().collection("Users").doc(user.uid).delete();
               // 2. Auth kaydını sil
               await user.delete();
               // 3. Yerel verileri temizle
               await AsyncStorage.removeItem("uid");
               Alert.alert("Success", "Your account has been deleted.");
             } catch (error) {
               console.log(error);
               Alert.alert(
                 "Authentication Required", 
                 "For security reasons, you must have recently signed in to delete your account. Please sign out and sign back in, then try again."
               );
             }
          } 
        }
      ]
    );
  };

  // MİSAFİR MODU GÖRÜNÜMÜ
  if (!user) {
    return (
      <View style={[screenStyle.container, styles.center]}>
        <UserSquare size={80} color={Colors.GRAY} variant="Outline" />
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.description}>
          Sign in to customize your profile, see your points, and manage your locations.
        </Text>
        <View style={{ width: '80%', marginTop: 20 }}>
          <CustomButton title="Login / Register" onPress={() => setIsGuest(false)} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={screenStyle.container} contentContainerStyle={{flexGrow: 1}}>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1, marginTop: 40 }}>
        <Avatar user={userData} />
      </View>

      <View style={{ alignItems: "center", flex: 1, marginTop: 20 }}>
        <Text style={styles.userName}>
          {userData?.name ? `${userData.name}` : "Loading..."}
        </Text>
        <Text style={styles.userEmail}>{userData?.email}</Text>
      </View>

      <View style={{ paddingVertical: 20, paddingHorizontal: 20, flex: 2 }}>
        <CustomButton
          onPress={() => navigation.navigate(EDITPROFILE, { user: userData })}
          title="Edit Profile" 
        />
        
        <View style={{ marginTop: 10 }}>
          <CustomButton
            style={{ backgroundColor: Colors.GRAY }} // Çıkış butonu rengi farklı olabilir
            onPress={signOut}
            title="Sign Out" 
          />
        </View>

        {/* HESAP SİLME BUTONU */}
        <TouchableOpacity 
          onPress={deleteAccount} 
          style={styles.deleteBtn}
        >
          <Trash size={20} color="red" variant="Bold" />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.WHITE
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.BLACK
  },
  userEmail: {
    fontSize: 16,
    fontWeight: "300",
    color: Colors.GRAY,
    marginTop: 5
  },
  deleteBtn: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    borderStyle: 'dashed'
  },
  deleteText: {
    color: 'red',
    fontWeight: '700',
    marginLeft: 10
  }
});

export default Profile;