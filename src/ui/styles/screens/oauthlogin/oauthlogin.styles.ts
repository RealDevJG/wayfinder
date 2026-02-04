import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export const useStaticOAuthLoginStyles = () => {
	return staticOAuthLogin;
};

const staticOAuthLogin = StyleSheet.create({
	homeButtonView: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
		padding: 5,
		borderTopWidth: 1,
		borderTopColor: appColourPalette.separator
	},
	homeButtonUp: {
		backgroundColor: appColourPalette.primary
	},
	homeButtonDown: {
		backgroundColor: appColourPalette.primaryDarker
	},
	homeButtonText: {
		color: appColourPalette.text,
		fontSize: 16
	}
});
