import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

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
		color: appColourPalette.text
	},
	dividerCommon: {
		height: 2,
		backgroundColor: appColourPalette.divider
	},
	edgeDivider: {
		flex: 1
	},
	middleDivider: {
		flex: 20
	}
});
