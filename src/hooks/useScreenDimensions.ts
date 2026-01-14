import { useSyncExternalStore } from "react";
import { getScreenDimensions, subscribe } from "../stores/screenDimensionsStore";

export function useScreenDimensions() {
	return useSyncExternalStore(
		subscribe,
		getScreenDimensions
	);
}
