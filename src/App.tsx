import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppInitialiser } from "./AppInitialiser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	return (
		<SafeAreaProvider>
			<ActionSheetProvider>
				<AppInitialiser />
			</ActionSheetProvider>
		</SafeAreaProvider>
	);
}
