import { useActionSheet } from "@expo/react-native-action-sheet";
import { useCallback } from "react";

type Handler = () => void;

export function useProjectContextMenu() {
	const { showActionSheetWithOptions } = useActionSheet();

	// prettier-ignore
	return useCallback((onEdit: Handler, onDelete: Handler) => {
		const options = ["Edit", "DELETE", "Cancel"];
		const destructiveButtonIndex = 1;
		const cancelButtonIndex = 2;

		showActionSheetWithOptions({ options, cancelButtonIndex, destructiveButtonIndex },
			(selectedIndex) => {
				if (selectedIndex === 0) {
					onEdit();
				} else if (selectedIndex === destructiveButtonIndex) {
					onDelete();
				}
			}
		);
	}, [showActionSheetWithOptions]);
}
