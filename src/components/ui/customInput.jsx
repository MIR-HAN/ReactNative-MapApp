import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../../theme/colors';
import { height } from '../../utils/constansts';
import { SearchNormal } from 'iconsax-react-nativejs';

const CustomInput = (props) => {

    const { icon, inputTitle = null } = props
    return (
        <View style={{marginVertical:5}}>

            <Text style={{ fontSize: 15, fontWeight: "bold" }}>{inputTitle}</Text>

            <View style={styles.container}>
                {icon}
                <TextInput
                    {...props}
                    style={{
                        minHeight: height * 0.055,
                        paddingHorizontal: 5,
                        fontSize: 16,
                        flex:1
                    }}
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        marginVertical: 5
    },
    text: {
        fontSize: 20,
    },
});

export default CustomInput;