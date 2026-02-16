import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./ui/screens/Home";
import OAuthLogin from "./ui/screens/OAuthLogin";
import Projects from "./ui/screens/Projects";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="OAuthLogin" component={OAuthLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Projects" component={Projects} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
