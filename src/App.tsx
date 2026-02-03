import { NavigationContainer } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./AppNavigation";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
