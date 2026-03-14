import { StyleSheet } from "react-native";
import { ProjectViewStyles } from "../../../components/screens/home/ProjectView";
import { colourPalette } from "../../colourPalette";

export function useHomeProjectViewStyles() {
	return staticProjectViewStyles;
}

const staticProjectViewStyles: ProjectViewStyles = StyleSheet.create({
	container: {
		width: "100%",
		height: "auto",
		borderBottomWidth: 1,
		borderBottomColor: colourPalette.separator,
		padding: "2%"
	},
	containerUp: {
		backgroundColor: colourPalette.secondary
	},
	containerDown: {
		backgroundColor: colourPalette.secondaryDarker
	},
	infoContainer: {
		margin: 3
	},
	statusContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	statusText: {
		color: colourPalette.text,
		padding: 2,
		paddingLeft: 6
	},
	titleText: {
		color: colourPalette.text,
		fontSize: 16,
		fontWeight: 600
	},
	summaryText: {
		color: colourPalette.text,
		fontStyle: "italic"
	}
});
