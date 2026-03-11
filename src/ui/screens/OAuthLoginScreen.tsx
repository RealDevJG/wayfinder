import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { services } from "../../modules/ServiceManager";
import { OAuthProvider } from "../../shared/domain/oAuthProvider";
import { Constants } from "../../shared/utils/constants";
import { useUserStore } from "../../state/zustand/userStore";
import CustomPressable from "../components/foundational/CustomPressable";
import CustomHeader from "../components/foundational/Headers/CustomHeader";
import OAuthLoginView from "../components/screens/oauthlogin/OAuthLoginView";
import { useGlobalStyles } from "../styles/global.styles";

const googleImage = require("../../../resources/assets/images/oauth/google-logo.png");

export default function OAuthLoginScreen() {
    const user = useUserStore((state) => state.user);
    const globalStyles = useGlobalStyles();

    async function handleLogin(provider: Lowercase<OAuthProvider>) {
        const uri = `${Constants.API_URL}/auth/${provider}`;

        const redirectUri = Linking.createURL("auth-success");
        const result = await WebBrowser.openAuthSessionAsync(uri, redirectUri);

        if (result.type === "success") {
            const code = new URL(result.url).searchParams.get("code");

            if (!code) {
                console.error("No exchange code provided during OAuth login");
                return;
            }

            services.userService.login(code);
        }
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="OAuth Login" showRightButton={false} />
            <View style={globalStyles.contentContainer}>
                {user ? (
                    <>
                        <Text>You are logged in as {user?.username}</Text>
                        <CustomPressable onPress={services.userService.logout}>
                            <Text style={globalStyles.bannerButtonText}>LOG OUT</Text>
                        </CustomPressable>
                    </>
                ) :
                    <OAuthLoginView providerImage={googleImage} providerTitle="Google" onPress={() => handleLogin("google")} />
                }
            </View>
        </SafeAreaView>
    );
}
