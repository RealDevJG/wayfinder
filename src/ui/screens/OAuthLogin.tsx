import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LowercaseOAuthProvider } from "../../common/types/oAuthProvider";
import { API_URL } from "../../common/utils/constants";
import { UserService } from "../../core/auth/user.service";
import { useUserStore } from "../../state/zustand/userStore";
import BannerButton from "../components/foundational/BannerButton";
import CustomHeader from "../components/foundational/CustomHeader";
import PressableButton from "../components/foundational/PressableButton";
import OAuthLoginView from "../components/screens/oauthlogin/OAuthLoginView";
import { useStaticGlobalStyles } from "../styles/global.styles";

const googleImage = require("../../../resources/assets/images/OAuth/google-logo.png");

export default function OAuthLogin() {
    const navigation = useNavigation<any>();
    const user = useUserStore((state) => state.user);

    const globalStyles = useStaticGlobalStyles();

    function gotoHomescreen() {
        navigation.navigate("Home");
    }

    async function OAuthLogin(provider: LowercaseOAuthProvider) {
        const uri = `${API_URL}/auth/${provider}`;

        // TODO: when switching to eas, might need rewrite to wayfinder:// scheme
        // const redirectUri = "exp://192.168.1.161:8081/--/auth-success";

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

    if (user) {
        return (
            <SafeAreaView style={globalStyles.appContainer}>
                <CustomHeader title="OAuth Login" showBackButton={false} />
                <View style={globalStyles.contentContainer}>
                    <Text>You are logged in as {user?.username}</Text>
                    <PressableButton onPress={UserService.logout}>
                        <Text style={globalStyles.bannerButtonText}>LOG OUT</Text>
                    </PressableButton>
                </View>
                <BannerButton onPress={gotoHomescreen}>
                    <Text style={globalStyles.bannerButtonText}>BACK TO HOME</Text>
                </BannerButton>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="OAuth Login" showBackButton={false} />
            <View style={globalStyles.contentContainer}>
                <OAuthLoginView providerImage={googleImage} providerTitle="Google" onPress={() => OAuthLogin("google")} />
            </View>
            <BannerButton onPress={gotoHomescreen}>
                <Text style={globalStyles.bannerButtonText}>BACK TO HOME</Text>
            </BannerButton>
        </SafeAreaView>
    );
}
