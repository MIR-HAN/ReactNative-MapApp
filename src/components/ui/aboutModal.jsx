import React from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, } from 'react-native';
import { Colors } from '../../theme/colors'; // Kendi yoluna göre ayarla
import CustomButton from '../ui/customButton';

const AboutModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.modalTitle}>About Maple</Text>

                        <Text style={styles.modalText}>

                            Maple helps you discover local farmers and independent producers.
                            {"\n\n"}
                            Find farm shops, garden stands, and local points where fresh products are sold based on a trustly controbution and fair price. Our mission is to support sustainable production and make fresh food accessible to everyone, everywhere.
                            {"\n\n"}
                            Find your local gems, support.. your community, and eat fresh!

                        </Text>
                    </ScrollView>

                    <CustomButton
                        onPress={onClose}
                        title="Got it!"
                        style={{ marginTop: 20, height: 45 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        maxHeight: '60%',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.LOGOCOLOR,
        marginBottom: 15,
        textAlign: 'center'
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.BLACK,

    }
});

export default AboutModal;