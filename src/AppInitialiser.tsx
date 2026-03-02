import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AppNavigator from "./AppNavigation";
import { services } from "./modules/ServiceManager";
import { setupAxiosInterceptors } from "./shared/api/axios/interceptors";

export const AppInitialiser = () => {
    const [appReady, setAppReady] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            await Promise.all([
                services.userService.loginWithStorageData()
            ]).then(() => {
                // Ensure everything is fully set by also adding an additional delay
                setTimeout(() => setAppReady(true), 300);
                services.userUpdated();
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
