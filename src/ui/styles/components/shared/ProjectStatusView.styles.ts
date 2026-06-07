import { StyleSheet } from "react-native";
import { colourPalette } from "../../colourPalette";

export function useProjectStatusViewStyles() {
	return staticProjectStatusViewStyles;
}

const staticProjectStatusViewStyles = StyleSheet.create({
	statusContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	statusIcon: {
		width: 12,
		height: 12,
		borderRadius: "100%",
		borderWidth: 1,
		borderColor: colourPalette.separator,
	},
	statusText: {
		color: colourPalette.text,
		padding: 2,
		paddingLeft: 6
	}
});
