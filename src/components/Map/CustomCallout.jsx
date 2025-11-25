import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { ArrowRight, Star } from 'iconsax-react-nativejs';
import ImageContainer from '../ui/imageContaine';

const CustomCallout = ({ title, description, point, image }) => {
  return (
    <View style={styles.card}>
      {/* Title & Rating */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rating}>
          <Star size={18} color={Colors.STAR_YELLOW} variant="Bold" />
          <Text style={styles.point}>{point}</Text>
        </View>
      </View>

      {/* Image */}
      <ImageContainer image={image} />

      {/* Description */}
      <Text style={styles.desc} numberOfLines={2}>
        {description}
      </Text>

      {/* Arrow */}
      <TouchableOpacity style={styles.arrowButton}>
        <ArrowRight size={28} color={Colors.GREEN} variant="Bold" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 10,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.BLACK,
    flexShrink: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    fontWeight: '600',
    fontSize: 13,
    marginLeft: 5,
    color: Colors.BLACK,
  },
  desc: {
    fontSize: 13,
    color: Colors.GRAY,
    marginTop:5,
  },
  arrowButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default CustomCallout;
