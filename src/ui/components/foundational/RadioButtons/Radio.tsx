import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { useRadioStyles } from "../../../styles/components/foundational/Radio.styles";
import { useRadioGroup } from "./RadioGroup";

type RadioProps = {
    label: string;
    value?: any;
    selected?: boolean;
}

const Radio: React.FC<RadioProps> = ({ label, value, selected }) => {
    const { selectedValue, setSelectedValue, onChildPressed, selectedStyleOverride, stylingForChildren } = useRadioGroup();
    const styles = useRadioStyles();

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

export default Radio;
