import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./ui/screens/HomeScreen";
import OAuthLoginScreen from "./ui/screens/OAuthLoginScreen";
import ProjectScreen from "./ui/screens/ProjectScreen";
import SnapshotScreen from "./ui/screens/SnapshotScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OAuthLogin" component={OAuthLoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Project" component={ProjectScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Snapshot" component={SnapshotScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
