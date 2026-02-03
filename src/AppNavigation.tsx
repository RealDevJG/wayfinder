import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";
import OAuthLogin from "./screens/OAuthLogin";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName="OAuthLogin">
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="OAuthLogin" component={OAuthLogin} options={{ headerShown: false }} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
