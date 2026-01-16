import React, { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useStaticGlobalStyles } from "../../styles/global.styles";

interface PressableButtonProps {
	children?: ReactNode;
	onPress?: () => void;
	onLongPress?: () => void;
	onPressIn?: () => void;
	longPressDelay?: number;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	disabledStyleOverride?: StyleProp<ViewStyle>;
	buttonDownStyleOverride?: StyleProp<ViewStyle>;
	buttonUpStyleOverride?: StyleProp<ViewStyle>;
}

const PressableButton: React.FC<PressableButtonProps> = (
		{ children, onPress, onLongPress, onPressIn, longPressDelay, disabled, style, disabledStyleOverride, buttonDownStyleOverride, buttonUpStyleOverride }
	) => {
	const globalStyles = useStaticGlobalStyles();

	return (
		<Pressable onPress={onPress} onLongPress={onLongPress} onPressIn={onPressIn} delayLongPress={longPressDelay} disabled={disabled} style={({ pressed }) => [
			style,
			disabled ? (disabledStyleOverride ?? globalStyles.disabledButton)
				: pressed ? (buttonDownStyleOverride ?? globalStyles.buttonDown) : (buttonUpStyleOverride ?? globalStyles.buttonUp)
		]}>
			{children}
		</Pressable>
	);
};

export default PressableButton;
