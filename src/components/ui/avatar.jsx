import { User } from 'iconsax-react-nativejs';
import React from 'react';
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { height, width } from '../../utils/constansts';
import { Colors } from '../../theme/colors';
import ImagePicker from 'react-native-image-crop-picker'
const Avatar = ({ user, onChangeImage, select }) => {


    const openGalery =()=>{
        ImagePicker.openPicker({
            width:500,
            height:500,
            includeBase64:true,
            cropping:true,
        }).then(image =>{
          onChangeImage(image.data, image.mime)

        })
    }


    return (
        <TouchableOpacity
        disabled={!select}
        onPress={openGalery}
        style={styles.container}>
            {
                user?.image ?
                <Image
                style={{
                    width: width * 0.20,
                    height: width * 0.20,
                    borderRadius:50,
                    resizeMode:"contain",
                }}
                source={{
                  uri:user.image,
                }}
              /> :
                    <User size={30} variant='Bold' />
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.20,
        height: width * 0.20,
        backgroundColor: Colors.SOFTGRAY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        shadowOffset: {
            width: 1,
            height: 11,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11.14,
        margin: 30,
        alignSelf: "center"

    },
    text: {
        fontSize: 20,
    },
});

export default Avatar;