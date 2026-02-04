import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { useScreenDimensions } from "../../../hooks/useScreenDimensions";
import { appColourPalette } from "../../appColourPalette";

export const useStaticHomeStyles = () => {
	return staticHomeStyles;
};

export const useDynamicHomeStyles = (insets: EdgeInsets) => {
	const { width, height } = useScreenDimensions();

	return useMemo(() => {
		const shortestSide = Math.min(width, height);
		const addProjectTextSize = shortestSide * 0.14;

		return StyleSheet.create({
			addProjectButton: {
				borderColor: appColourPalette.accentDarker,
				borderRadius: "100%",
				borderWidth: 2,
				position: "absolute",
				right: insets.right,
				bottom: insets.bottom,
				margin: 30,
				width: addProjectTextSize,
				height: addProjectTextSize,
				alignItems: "center",
				justifyContent: "center"
			}
		});
	}, [width, height, insets]);
};

const staticHomeStyles = StyleSheet.create({
	projectListScrollView: {
		backgroundColor: appColourPalette.background
	},
	addProjectButtonText: {
		color: appColourPalette.altText,
		fontWeight: 600,
		fontSize: 24
	},
	addProjectButtonUp: {
		backgroundColor: appColourPalette.accent,
		opacity: 0.8
	},
	addProjectButtonDown: {
		backgroundColor: appColourPalette.accentDarker,
		opacity: 0.8
	}
});
