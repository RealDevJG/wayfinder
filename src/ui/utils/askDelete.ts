import { Alert } from "react-native";

export function askDelete(onConfirm: () => void) {
	Alert.alert("Are you sure you want to delete this item?", "It will permanently be gone", [
		{
			text: "Cancel",
			style: "cancel"
		},
		{
			text: "DELETE",
			style: "destructive",
			onPress: onConfirm
		}
	]);
}
