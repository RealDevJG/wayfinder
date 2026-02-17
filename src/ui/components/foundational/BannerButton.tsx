import React, { ReactNode } from "react";
import { Pressable, ViewStyle } from "react-native";
import { useStaticGlobalStyles } from "../../styles/global.styles";

interface BannerButtonProps {
	children?: ReactNode;
	onPress?: () => void;
	onLongPress?: () => void;
	onPressIn?: () => void;
	longPressDelay?: number;
	disabled?: boolean;
	style?: ViewStyle;
	disabledStyle?: ViewStyle;
	buttonDownStyle?: ViewStyle;
	buttonUpStyle?: ViewStyle;
}

const BannerButton: React.FC<BannerButtonProps> = ({ children, onPress, onLongPress, onPressIn, longPressDelay, disabled, style, disabledStyle, buttonDownStyle, buttonUpStyle }) => {
	const globalStyles = useStaticGlobalStyles();

	return (
		<Pressable onPress={onPress} onLongPress={onLongPress} onPressIn={onPressIn} delayLongPress={longPressDelay} disabled={disabled} style={({ pressed }) => [
			{ width: "100%" },
			style ?? globalStyles.bannerButtonView,
			disabled ? (disabledStyle ?? globalStyles.disabledButton)
				: pressed ? (buttonDownStyle ?? globalStyles.bannerButtonDown) : (buttonUpStyle ?? globalStyles.bannerButtonUp)
		]}>
			{children}
		</Pressable>
	);
};

export default BannerButton;
