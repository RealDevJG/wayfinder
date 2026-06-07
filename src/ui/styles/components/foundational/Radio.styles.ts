import { StyleSheet } from "react-native";
import { colourPalette } from "../../colourPalette";

export function useRadioStyles() {
	return staticRadioStyles;
}

const staticRadioStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center"
	},
	radioOuter: {
		width: 18,
		height: 18,
		borderRadius: "100%",
		borderWidth: 2,
		borderColor: colourPalette.separator,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10
	},
	radioOuterSelected: {
		borderColor: "#333333"
	},
	radioInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#333333"
	},
	label: {
		fontSize: 16
	}
});
