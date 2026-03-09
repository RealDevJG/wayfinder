import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export function useEditableProjectHeaderStyles() {
	return staticEditableProjectHeaderStyles;
}

const staticEditableProjectHeaderStyles = StyleSheet.create({
	headerCommon: {
		width: "100%",
		backgroundColor: appColourPalette.primary,
		justifyContent: "space-between",
		alignItems: "center"
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: appColourPalette.separator,
		width: "100%"
	},
	statusBlock: {
		marginTop: 10
	},
	doneButtonView: {
		marginTop: 10,
		marginBottom: 10,
		padding: 5,
		alignItems: "center"
	},
	doneButtonText: {
		color: appColourPalette.text
	},
	doneButtonUp: {
		backgroundColor: appColourPalette.accent
	},
	doneButtonDown: {
		backgroundColor: appColourPalette.accentDarker
	}
});
