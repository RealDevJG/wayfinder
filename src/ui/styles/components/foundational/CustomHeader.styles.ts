import { StyleSheet } from "react-native";
import { useScreenDimensions } from "../../../hooks/useScreenDimensions";
import { colourPalette } from "../../colourPalette";

export function useCustomHeaderStyles() {
	const { height: screenHeight } = useScreenDimensions();
	const fixedHeaderHeight = screenHeight * 0.0833;

	return {
		...staticCustomHeaderStyles,
		headerContainer: { height: fixedHeaderHeight }
	};
}

const headerButtonSize = 34;

const staticCustomHeaderStyles = StyleSheet.create({
	headerBody: {
		flex: 1,
		padding: 5,
		flexDirection: "row",
		backgroundColor: colourPalette.primary,
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: colourPalette.separator,
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerTitleText: {
		color: colourPalette.text,
		textAlign: "center",
		fontSize: 24,
		fontWeight: 400
	},
	headerButtonIcon: {
		width: headerButtonSize,
		height: headerButtonSize
	},
	headerButton: {
		width: headerButtonSize,
		height: headerButtonSize,
		margin: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	headerButtonText: {
		fontWeight: 600,
		fontSize: 12,
		color: colourPalette.text
	},
	headerButtonUp: {
		backgroundColor: colourPalette.primary
	},
	headerButtonDown: {
		backgroundColor: colourPalette.primaryDarker
	}
});
