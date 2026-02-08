import { StyleSheet } from "react-native";
import { appColourPalette } from "./appColourPalette";

export const useStaticGlobalStyles = () => {
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
		backgroundColor: appColourPalette.accent
	},
	buttonDown: {
		backgroundColor: appColourPalette.accentDarker
	},
	disabledButton: {
		backgroundColor: appColourPalette.disabled
	},
	appContainer: {
		flex: 1,
		backgroundColor: appColourPalette.background,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 0
	},
	contentContainer: {
		flex: 11,
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	bannerButtonView: {
		width: "100%",
		alignItems: "center",
		padding: 4,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: appColourPalette.separator,
		borderBottomColor: appColourPalette.separator
	},
	bannerButtonUp: {
		backgroundColor: appColourPalette.primary
	},
	bannerButtonDown: {
		backgroundColor: appColourPalette.primaryDarker
	},
	bannerButtonText: {
		color: appColourPalette.text,
		fontSize: 16
	}
});
