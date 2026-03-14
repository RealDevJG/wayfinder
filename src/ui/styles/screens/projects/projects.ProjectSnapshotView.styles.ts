import { StyleSheet } from "react-native";
import { colourPalette } from "../../colourPalette";

export function useProjectSnapshotViewStyles() {
	return staticProjectSnapshotViewStyles;
}

const staticProjectSnapshotViewStyles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: colourPalette.separator,
		padding: "2%",
		marginBottom: 7
	},
	containerUp: {
		backgroundColor: colourPalette.secondary
	},
	containerDown: {
		backgroundColor: colourPalette.secondaryDarker
	},
	horizontalContentContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap"
	},
	specialisedContentContainer: {
		margin: 5,
		borderLeftWidth: 2,
		borderColor: colourPalette.divider
	},
	specialisedTextTitle: {
		color: colourPalette.text,
		fontSize: 14,
		fontWeight: 600,
		margin: 1,
		marginLeft: 4
	},
	specialisedTextBlock: {
		color: colourPalette.text,
		margin: 1,
		marginLeft: 8
	},
	titleText: {
		color: colourPalette.text,
		fontSize: 16,
		fontWeight: 700
	},
	updatedAtText: {
		color: colourPalette.text,
		fontStyle: "italic"
	}
});
