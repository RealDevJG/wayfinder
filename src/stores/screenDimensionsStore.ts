import { Dimensions, ScaledSize } from "react-native";

let screen: ScaledSize = Dimensions.get("screen");
const listeners = new Set<() => void>();

Dimensions.addEventListener("change", ({ screen: next }) => {
	screen = next;
	listeners.forEach(listener => listener());
});

export function getScreenDimensions(): ScaledSize {
	return screen;
}

export function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}
