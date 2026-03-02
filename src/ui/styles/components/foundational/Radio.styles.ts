import { StyleSheet } from "react-native";

export function useRadioStyles() {
	return staticRadioStyles;
}

const staticRadioStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center"
	},
	radioOuter: {
		width: 22,
		height: 22,
		borderRadius: 11,
		borderWidth: 2,
		borderColor: "#999999",
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
