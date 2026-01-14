import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
