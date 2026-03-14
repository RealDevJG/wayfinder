import { StyleSheet } from "react-native";
import { colourPalette } from "../../colourPalette";

export function useSectionStyles() {
	return staticSectionStyles;
}

const staticSectionStyles = StyleSheet.create({
	dividerHeaderContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	headerContainer: {
		padding: 3
	},
	headerText: {
		fontSize: 16,
		color: colourPalette.text
	},
	dividerCommon: {
		height: 2,
		backgroundColor: colourPalette.divider
	},
	edgeDivider: {
		flex: 1
	},
	middleDivider: {
		flex: 20
	}
});
