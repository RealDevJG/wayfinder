import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export const useHomeStyles = () => {
	return staticHomeStyles;
};

const staticHomeStyles = StyleSheet.create({
	projectListScrollView: {
		width: "100%",
		backgroundColor: appColourPalette.background
	},
	addProjectButtonText: {
		color: appColourPalette.altText,
		fontWeight: 600,
		fontSize: 24
	},
	addProjectButtonUp: {
		backgroundColor: appColourPalette.accent,
		opacity: 0.82
	},
	addProjectButtonDown: {
		backgroundColor: appColourPalette.accentDarker,
		opacity: 0.82
	}
});
