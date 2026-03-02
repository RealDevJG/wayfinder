import { StyleSheet } from "react-native";
import { appColourPalette } from "../../appColourPalette";

export function useOAuthViewStyles() {
	return staticOAuthViewStyles;
}

const staticOAuthViewStyles = StyleSheet.create({
	containerButton: {
		flexDirection: "row",
		padding: 5,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: appColourPalette.separator
	},
	containerButtonUp: {
		backgroundColor: appColourPalette.secondary
	},
	containerButtonDown: {
		backgroundColor: appColourPalette.secondaryDarker
	},
	containerContents: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	providerTitle: {
		fontSize: 16,
		textAlign: "center"
	},
	providerImage: {
		width: 50,
		height: 50
	}
});
