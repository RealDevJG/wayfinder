import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export function useCustomHeaderStyles() {
	return staticCustomHeaderStyles;
}

const headerButtonSize = 34;

const staticCustomHeaderStyles = StyleSheet.create({
	headerContainer: {
		flex: 1
	},
	headerBody: {
		flex: 1,
		padding: 5,
		flexDirection: "row",
		backgroundColor: appColourPalette.primary,
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: appColourPalette.separator,
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerTitleText: {
		color: appColourPalette.text,
		textAlign: "center",
		fontSize: 24,
		fontWeight: 400
	},
	headerButtonIcon: {
		width: headerButtonSize,
		height: headerButtonSize
	},
	headerButton: {
		width: headerButtonSize,
		height: headerButtonSize,
		margin: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	headerButtonText: {
		fontWeight: 600,
		fontSize: 12,
		color: appColourPalette.text
	},
	headerButtonUp: {
		backgroundColor: appColourPalette.primary
	},
	headerButtonDown: {
		backgroundColor: appColourPalette.primaryDarker
	}
});
