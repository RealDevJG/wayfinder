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

const BannerButton: React.FC<BannerButtonProps> = (
	{ children, onPress, onLongPress, onPressIn, longPressDelay, disabled, style, disabledStyle: disabledStyleOverride, buttonDownStyle: buttonDownStyleOverride, buttonUpStyle: buttonUpStyleOverride }
) => {
	const globalStyles = useStaticGlobalStyles();

	return (
		<Pressable onPress={onPress} onLongPress={onLongPress} onPressIn={onPressIn} delayLongPress={longPressDelay} disabled={disabled} style={({ pressed }) => [
			style ?? globalStyles.bannerButtonView,
			disabled ? (disabledStyleOverride ?? globalStyles.disabledButton)
				: pressed ? (buttonDownStyleOverride ?? globalStyles.bannerButtonDown) : (buttonUpStyleOverride ?? globalStyles.bannerButtonUp)
		]}>
			{children}
		</Pressable>
	);
};

export default BannerButton;
