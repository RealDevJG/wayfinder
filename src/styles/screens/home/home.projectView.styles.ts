import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export interface ProjectViewStyles {
	container: ViewStyle;
	infoContainer: ViewStyle;
	statusContainer: ViewStyle;
	statusIcon: ViewStyle;
	statusText: TextStyle;
	titleText: TextStyle;
	summaryText: TextStyle;
}

export function useHomeProjectViewStyles() {
	return staticProjectViewStyles;
}

const staticProjectViewStyles: ProjectViewStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "auto",
		borderBottomWidth: 1,
		borderBottomColor: appColourPalette.separator,
		backgroundColor: appColourPalette.secondary,
		padding: "2%"
	},
	infoContainer: {
		margin: 3
	},
	statusContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
	},
	titleText: {
		color: appColourPalette.text,
		fontSize: 16,
		fontWeight: 600
	},
	summaryText: {
		color: appColourPalette.text,
		fontStyle: "italic"
	}
});
