import { StyleSheet } from "react-native";

export function useEditableHeaderStyles() {
	return staticEditableHeaderStyles;
}

const staticEditableHeaderStyles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "#00000030"
	}
});
