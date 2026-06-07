import { StyleSheet } from "react-native";
import { colourPalette } from "../../colourPalette";

export function useEditableProjectHeaderStyles() {
	return staticEditableProjectHeaderStyles;
}

const staticEditableProjectHeaderStyles = StyleSheet.create({
	headerCommon: {
		width: "100%",
		backgroundColor: colourPalette.primary,
		justifyContent: "space-between",
		alignItems: "center"
	},
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: colourPalette.separator,
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
		color: colourPalette.text
	},
	doneButtonUp: {
		backgroundColor: colourPalette.accent
	},
	doneButtonDown: {
		backgroundColor: colourPalette.accentDarker
	}
});
