import React, { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useStaticGlobalStyles } from "../styles/global.styles";

interface PressableButtonType {
	children?: ReactNode;
	onPress?: () => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	buttonDownStyleOverride?: StyleProp<ViewStyle>;
	buttonUpStyleOverride?: StyleProp<ViewStyle>;
}

const PressableButton: React.FC<PressableButtonType> = ({ children, onPress, disabled, style, buttonDownStyleOverride, buttonUpStyleOverride }) => {
	const globalStyles = useStaticGlobalStyles();

	return (
		<Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
			style,
			disabled ? globalStyles.disabledButton
				: pressed ? (buttonDownStyleOverride ?? globalStyles.buttonDown) : (buttonUpStyleOverride ?? globalStyles.buttonUp)
		]}>
			{children}
		</Pressable>
	);
};

export default PressableButton;
