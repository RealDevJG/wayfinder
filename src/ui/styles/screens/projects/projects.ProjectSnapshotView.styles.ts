import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export function useProjectSnapshotViewStyles() {
	return staticProjectSnapshotViewStyles;
}

const staticProjectSnapshotViewStyles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: appColourPalette.separator,
		padding: "2%",
		marginBottom: 7
	},
	containerUp: {
		backgroundColor: appColourPalette.secondary
	},
	containerDown: {
		backgroundColor: appColourPalette.secondaryDarker
	},
	horizontalContentContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap"
	},
	specialisedContentContainer: {
		margin: 5,
		borderLeftWidth: 2,
		borderColor: appColourPalette.divider
	},
	specialisedTextTitle: {
		color: appColourPalette.text,
		fontSize: 14,
		fontWeight: 600,
		margin: 1,
		marginLeft: 4
	},
	specialisedTextBlock: {
		color: appColourPalette.text,
		margin: 1,
		marginLeft: 8
	},
	titleText: {
		color: appColourPalette.text,
		fontSize: 16,
		fontWeight: 700
	},
	updatedAtText: {
		color: appColourPalette.text,
		fontStyle: "italic"
	}
});
