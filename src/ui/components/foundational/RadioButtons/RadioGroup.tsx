import React, { createContext, useContext, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface RadioGroupContextType {
    selectedValue: any;
    setSelectedValue: (value: any) => void;
    onChildPressed?: (value: any) => void;
    selectedStyleOverride?: StyleProp<ViewStyle>;
    stylingForChildren?: StyleProp<ViewStyle>;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

interface RadioGroupProps {
    children: React.ReactNode;
    onChildPressed: (value: any) => void;
    styleOverride?: StyleProp<ViewStyle>;
    selectedStyleOverride?: StyleProp<ViewStyle>;
    stylingForChildren?: StyleProp<ViewStyle>;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ children, onChildPressed, styleOverride, selectedStyleOverride, stylingForChildren }) => {
    const [selectedValue, setSelectedValue] = useState<any>();

    return (
        <RadioGroupContext.Provider value={{ selectedValue, setSelectedValue, onChildPressed, selectedStyleOverride, stylingForChildren }}>
            <View style={styleOverride}>
                {children}
            </View>
        </RadioGroupContext.Provider>
    );
};

export const useRadioGroup = () => {
    const ctx = useContext(RadioGroupContext);

    if (!ctx) {
        throw new Error("Radio must be inside a RadioGroup");
    }

    return ctx;
};
