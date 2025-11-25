import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { screenStyle } from '../../styles/screenStyle';
import { Colors } from '../../theme/colors';
import CustomButton from '../../components/ui/customButton';
import firestore from '@react-native-firebase/firestore';
import ImageContainer from '../../components/ui/imageContaine';
import { Star, Calendar, Location } from 'iconsax-react-nativejs';
import auth from "@react-native-firebase/auth"

const Detail = ({ route }) => {
  const { item } = route?.params;
  const [loading, setLoading] = useState(false);

 

  const addFavorite = async () => {
    setLoading(true);
    try {

      const user = auth().currentUser;

      const ref = firestore().collection('Favorites');

      // check the id
      const snapshot = await ref
        .where('id', '==', item?.id)
        .where('userId', '==', user.uid)
        .get();

      const exists = !snapshot.empty;
      

      if (exists) return Alert.alert('This location is already in favorites!');

      // if id not available add
      await ref.doc(`${user?.uid}_${item?.id}`).set({
        ...item,                // item içindeki tüm bilgileri al
        userId: user.uid,       // kendi kullanıcı ID’ni ekle
      });
      
      Alert.alert('Added to favorites!');
    } catch (e) {
      console.error(e);
      Alert.alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={screenStyle.container}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ padding: 6, }}>
        {/* Title */}
        <View style={styles.row}>
          <Text style={styles.label}>Title</Text>
          <Text style={styles.value}>{item?.title}</Text>
        </View>

        {/* Rating */}
        <View style={styles.row}>
          <Text style={styles.label}>Rating</Text>
          <View style={styles.ratingRow}>
            <Star size={20} color={Colors.STAR_YELLOW} variant="Bold" />
            <Text style={styles.value}>{item?.point}</Text>
          </View>
        </View>

        {/* Image */}
        <ImageContainer customStyle={styles.image} image={item?.image} />

        {/* Description */}
        <View style={[styles.row, styles.centerRow]}>
          <Text style={styles.label}>Description</Text>

          <ScrollView style={{ maxHeight: 100, marginTop: 10 }}>
            <Text style={[styles.value, { marginTop: 10 }]}>{item?.desc}</Text>
          </ScrollView>

        </View>



        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* Date */}
          <View style={styles.infoRow}>
            <Calendar size={18} color={Colors.GREEN} />
            <Text style={styles.infoText}>{item.date || 'Unknown date'}</Text>
          </View>

          {/* Coordinates */}
          <View style={styles.infoRow}>
            <Location size={18} color={Colors.GREEN} />
            <Text style={styles.infoText}>
              {item?.coordinate?.latitude?.toFixed(5)}, {item?.coordinate?.longitude?.toFixed(5)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Button at the bottom */}
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={loading}
          onPress={addFavorite}
          title="Add Favorite"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderColor: Colors.SOFTGRAY,

  },
  centerRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.BLACK,
  },
  value: {
    fontWeight: '500',
    fontSize: 15,
    color: Colors.GRAY,
    flexShrink: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 180,
    borderRadius: 12,
    marginVertical: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.GRAY,
    marginVertical: 16,
    opacity: 0.3,
  },
  infoSection: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: Colors.BLACK,
    fontSize: 14.5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 15,
    right: 15,
  },
});

export default Detail;
