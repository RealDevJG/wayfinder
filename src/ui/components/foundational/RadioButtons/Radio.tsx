import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRadioGroup } from "./RadioGroup";

interface RadioProps {
    label: string;
    value?: any;
    selected?: boolean;
}

const Radio: React.FC<RadioProps> = ({ label, value, selected }) => {
    const { selectedValue, setSelectedValue, onChildPressed, selectedStyleOverride, stylingForChildren } = useRadioGroup();

    value ??= label;

    useEffect(() => {
        if (selected) {
            setSelectedValue(value);
        }
    }, []);

    const isSelected = selectedValue === value;

    function handlePress() {
        setSelectedValue(value);
        onChildPressed?.(value);
    }

    return (
        <Pressable onPress={handlePress} style={[styles.container, stylingForChildren]}>
            <View
                style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                    isSelected && selectedStyleOverride,
                ]}
            >
                {isSelected &&
                    <View style={styles.radioInner} />
                }
            </View>
            <Text style={styles.label}>
                {label}
            </Text>
        </Pressable>
    );
};

// TODO: put styles in its own file for consistency across the app
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#999999",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10
    },
    radioOuterSelected: {
        borderColor: "#333333"
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#333333"
    },
    label: {
        fontSize: 16
    }
});

export default Radio;
