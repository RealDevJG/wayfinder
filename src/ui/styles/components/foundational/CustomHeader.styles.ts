import { StyleSheet } from "react-native";
import { useScreenDimensions } from "../../../hooks/useScreenDimensions";
import { appColourPalette } from "../../appColourPalette";

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
		backgroundColor: appColourPalette.primary,
		width: "100%",
		borderBottomWidth: 1,
		borderBottomColor: appColourPalette.separator,
		justifyContent: "space-between",
		alignItems: "center"
	},
	headerTitleText: {
		color: appColourPalette.text,
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
		color: appColourPalette.text
	},
	headerButtonUp: {
		backgroundColor: appColourPalette.primary
	},
	headerButtonDown: {
		backgroundColor: appColourPalette.primaryDarker
	}
});
