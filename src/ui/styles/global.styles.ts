import { StyleSheet } from "react-native";
import { colourPalette } from "./colourPalette";

export const useGlobalStyles = () => {
	return staticGlobalStyles;
};

const buttonView = {
	padding: 4,
	borderRadius: 5
};

const circularButtonView = {
	...buttonView,
	borderRadius: "100%"
};

const staticGlobalStyles = StyleSheet.create({
	button: buttonView,
	circularButton: circularButtonView,
	buttonUp: {
		backgroundColor: colourPalette.accent
	},
	buttonDown: {
		backgroundColor: colourPalette.accentDarker
	},
	disabledButton: {
		backgroundColor: colourPalette.disabled
	},
	appContainer: {
		flex: 1,
		backgroundColor: colourPalette.statusBar,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0
	},
	contentContainer: {
		flex: 11,
		backgroundColor: colourPalette.background,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	scrollView: {
		width: "100%",
		backgroundColor: colourPalette.background
	},
	bannerButtonView: {
		alignItems: "center",
		padding: 4,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: colourPalette.separator,
		borderBottomColor: colourPalette.separator
	},
	bannerButtonUp: {
		backgroundColor: colourPalette.primary
	},
	bannerButtonDown: {
		backgroundColor: colourPalette.primaryDarker
	},
	bannerButtonText: {
		color: colourPalette.text,
		fontSize: 16
	}
});
