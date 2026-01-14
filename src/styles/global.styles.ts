import { StyleSheet } from "react-native";
import { appColourPalette } from "./appColourPalette";

export const useStaticGlobalStyles = () => {
	return staticGlobalStyles;
};

const button = {
	padding: 10,
	borderRadius: 5
}

const circularButton = {
	...button,
	borderRadius: "100%"
}

const staticGlobalStyles = StyleSheet.create({
	button,
	circularButton,
	buttonUp: {
		backgroundColor: appColourPalette.accent
	},
	buttonDown: {
		backgroundColor: appColourPalette.accentDarker
	},
	disabledButton: {
		backgroundColor: appColourPalette.disabled
	}
});
