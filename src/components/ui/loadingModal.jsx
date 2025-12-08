import React from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Colors } from '../../theme/colors';

const LoadingModal = ({ visible }) => {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <View style={{flex:1,backgroundColor: "rgba(0, 0, 0, 0.75)" , alignItems:"center", justifyContent:"center"}}>

               
               <ActivityIndicator size={"large"} color={Colors.GREEN} />
                <Text style={{color:Colors.WHITE, fontSize:20, marginTop:15, fontWeight:"600"}}>Loading</Text>
              
            </View>
        </Modal>
    );
};



export default LoadingModal;