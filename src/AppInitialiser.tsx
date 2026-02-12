import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AppNavigator from "./AppNavigation";
import { setupAxiosInterceptors } from "./core/api/axios/interceptors";
import { UserService } from "./core/auth/user.service";

export const AppInitialiser = () => {
    const [appReady, setAppReady] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            await Promise.all([UserService.attemptLogin()]).then(() => {
                // Ensure everything is fully set by also adding an additional delay
                setTimeout(() => setAppReady(true), 300);
            });
        }

        init();

        const cleanupInterceptors = setupAxiosInterceptors();
        return () => cleanupInterceptors();
    }, []);

    if (!appReady) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
};
