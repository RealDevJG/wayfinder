import { StyleSheet } from "react-native";

export const useProjectStyles = () => {
	return staticProjectStyles;
};

const staticProjectStyles = StyleSheet.create({
	sectionPadding: {
		padding: 5
	},
	newItemButtonIcon: {
		width: 20,
		height: 20
	},
	newItemButtonUp: {
		backgroundColor: "#00000000"
	},
	newItemButtonDown: {
		backgroundColor: "#00000022"
	}
});
