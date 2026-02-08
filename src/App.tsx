import { NavigationContainer } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./AppNavigation";
import { setupAxiosInterceptors } from "./core/api/axios/interceptors";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	useEffect(() => {
		const cleanupInterceptors = setupAxiosInterceptors();
		return () => cleanupInterceptors();
	}, []);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
