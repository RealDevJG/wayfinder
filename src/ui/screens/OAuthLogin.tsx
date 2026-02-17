import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LowercaseOAuthProvider } from "../../common/types/oAuthProvider";
import { API_URL } from "../../common/utils/constants";
import { UserService } from "../../core/auth/user.service";
import { useUserStore } from "../../state/zustand/userStore";
import CustomPressable from "../components/foundational/CustomPressable";
import CustomHeader from "../components/foundational/Headers/CustomHeader";
import OAuthLoginView from "../components/screens/oauthlogin/OAuthLoginView";
import { useStaticGlobalStyles } from "../styles/global.styles";

const googleImage = require("../../../resources/assets/images/oauth/google-logo.png");

export default function OAuthLogin() {
    const user = useUserStore((state) => state.user);
    const globalStyles = useStaticGlobalStyles();

    async function OAuthLogin(provider: LowercaseOAuthProvider) {
        const uri = `${API_URL}/auth/${provider}`;

        const redirectUri = Linking.createURL("auth-success");
        const result = await WebBrowser.openAuthSessionAsync(uri, redirectUri);

        if (result.type === "success") {
            const code = new URL(result.url).searchParams.get("code");

            if (!code) {
                console.error("No exchange code provided during OAuth login");
                return;
            }

            UserService.login(code);
        }
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="OAuth Login" />
            <View style={globalStyles.contentContainer}>
                {user ? (
                    <>
                        <Text>You are logged in as {user?.username}</Text>
                        <CustomPressable onPress={UserService.logout}>
                            <Text style={globalStyles.bannerButtonText}>LOG OUT</Text>
                        </CustomPressable>
                    </>
                ) :
                    <OAuthLoginView providerImage={googleImage} providerTitle="Google" onPress={() => OAuthLogin("google")} />
                }
            </View>
        </SafeAreaView>
    );
}
