import { StyleSheet } from "react-native";
import { colourPalette } from "../../colourPalette";

export function useNewItemModalStyles() {
	return staticNewItemModalStyles;
}

const staticNewItemModalStyles = StyleSheet.create({
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
		backgroundColor: colourPalette.secondary,
		borderColor: colourPalette.primaryDarker,
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
		backgroundColor: colourPalette.primaryDarker
	},
	buttonCancelUp: {
		backgroundColor: colourPalette.danger
	},
	buttonCancelDown: {
		backgroundColor: colourPalette.dangerDarker
	}
});
