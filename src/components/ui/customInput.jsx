import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../../theme/colors';
import { height } from '../../utils/constansts';

const CustomInput = (props) => {
    const { icon, inputTitle = null, optional = false } = props;

    return (
        <View style={{ marginVertical: 8 }}>

            {/* LABEL + OPTIONAL BADGE */}
            {inputTitle && (
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                    <Text style={styles.label}>{inputTitle}</Text>

                    {optional && (
                        <View style={styles.optionalBadge}>
                            <Text style={styles.optionalText}>Optional</Text>
                        </View>
                    )}
                </View>
            )}

            {/* INPUT AREA */}
            <View style={styles.container}>
                {icon}
                <TextInput
                    {...props}
                    style={styles.input}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        fontWeight: "bold",
        color: Colors.BLACK,
    },
    optionalBadge: {
        marginLeft: 8,
        backgroundColor:Colors.STAR_YELLOW,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    optionalText: {
        fontSize: 11,
        color: Colors.BLACK,
    },
    container: {
        backgroundColor:Colors.SOFTGRAY,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 4,
    },
    input: {
        minHeight: height * 0.055,
        paddingHorizontal: 5,
        fontSize: 16,
        flex: 1,
    },
});

export default CustomInput;
