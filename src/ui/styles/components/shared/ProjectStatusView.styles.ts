import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

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
		borderRadius: "100%"
	},
	statusText: {
		color: appColourPalette.text,
		padding: 2,
		paddingLeft: 6
	}
});
