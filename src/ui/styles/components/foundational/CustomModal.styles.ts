import { StyleSheet } from "react-native";

export function useCustomModalStyles() {
	return staticCustomModalStyles;
}

const staticCustomModalStyles = StyleSheet.create({
	overlay: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		width: "auto",
		alignItems: "center",
		justifyContent: "center",
		padding: 8
	}
});
