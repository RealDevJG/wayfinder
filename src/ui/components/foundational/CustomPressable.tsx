import React, { ReactNode } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { useGlobalStyles } from "../../styles/global.styles";

type PressableButtonProps = {
	children?: ReactNode;
	onPress?: () => void;
	onLongPress?: () => void;
	onPressIn?: () => void;
	longPressDelay?: number;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	disabledStyle?: StyleProp<ViewStyle>;
	buttonDownStyle?: StyleProp<ViewStyle>;
	buttonUpStyle?: StyleProp<ViewStyle>;
}

const CustomPressable: React.FC<PressableButtonProps> = ({ children, onPress, onLongPress, onPressIn, longPressDelay, disabled, style, disabledStyle, buttonDownStyle, buttonUpStyle }) => {
	const globalStyles = useGlobalStyles();

	return (
		<Pressable onPress={onPress} onLongPress={onLongPress} onPressIn={onPressIn} delayLongPress={longPressDelay} disabled={disabled} style={({ pressed }) => [
			style ?? globalStyles.button,
			disabled
				? (disabledStyle ?? globalStyles.disabledButton)
				: pressed
					? (buttonDownStyle ?? globalStyles.buttonDown)
					: (buttonUpStyle ?? globalStyles.buttonUp)
		]}>
			{children}
		</Pressable>
	);
};

export default CustomPressable;
