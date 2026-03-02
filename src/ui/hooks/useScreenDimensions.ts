import { useSyncExternalStore } from "react";
import { getScreenDimensions, subscribe } from "../stores/screenDimensionsStore";

// NOTE: currently unused, not sure if it will be
export function useScreenDimensions() {
	return useSyncExternalStore(
		subscribe,
		getScreenDimensions
	);
}
