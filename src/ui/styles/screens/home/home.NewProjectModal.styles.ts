import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export function useNewProjectModalStyles() {
	return staticNewProjectModalStyles;
}

const staticNewProjectModalStyles = StyleSheet.create({
	modalTitle: {
		fontSize: 20,
		fontWeight: 500
	},
	textInputContainer: {
		alignSelf: "flex-start",
		justifyContent: "space-between",
		margin: 3
	},
	textInput: {
		backgroundColor: appColourPalette.secondary,
		borderColor: appColourPalette.primaryDarker,
		width: 240,
		borderWidth: 1,
		paddingTop: 4,
		paddingBottom: 4
	},
	textInputTitle: {
		fontSize: 15,
		marginBottom: 2,
		fontWeight: 500
	},
	summaryTextInput: {
		height: "auto"
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 8,
		width: "60%"
	},
	buttons: {
		width: "48%",
		justifyContent: "center",
		alignItems: "center",
		padding: 3
	},
	buttonAdd: {
		backgroundColor: appColourPalette.primaryDarker
	},
	buttonCancelUp: {
		backgroundColor: appColourPalette.danger
	},
	buttonCancelDown: {
		backgroundColor: appColourPalette.dangerDarker
	}
});
