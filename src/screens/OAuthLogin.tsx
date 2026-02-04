import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login, refreshTokens } from "../auth/user.service";
import CustomHeader from "../components/foundational/CustomHeader";
import PressableButton from "../components/foundational/PressableButton";
import OAuthLoginView from "../components/screens/oauthlogin/OAuthLoginView";
import { useStaticGlobalStyles } from "../styles/global.styles";
import { useStaticOAuthLoginStyles } from "../styles/screens/oauthlogin/oauthlogin.styles";
import { LoginUser } from "../types/loginUser";
import { API_URL, secureStoreKeys } from "../utils/constants";
import { clearUser, getUser } from "../auth/user.repository";

const googleImage = require("../../resources/assets/images/OAuth/google-logo.png");

export default function OAuthLogin() {
    const navigation = useNavigation<any>();
    const globalStyles = useStaticGlobalStyles();
    const styles = useStaticOAuthLoginStyles();

    function gotoHomescreen() {
        navigation.navigate("Home");
    }

    async function makeRequest() {
        const uri = `${API_URL}/auth/google`;

        // TODO: when switching to eas, might need rewrite to wayfinder:// scheme
        // const redirectUri = "exp://192.168.1.161:8081/--/auth-success";

        const redirectUri = Linking.createURL("auth-success");
        const result = await WebBrowser.openAuthSessionAsync(uri, redirectUri);

        if (result.type === "success") {
            const code = new URL(result.url).searchParams.get("code");

            const response = await fetch(`${API_URL}/auth/exchange`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            if (response.ok) {
                const user: LoginUser = await response.json();
                await login(user);
            }
        }
    }

    // TEMP FUNCTIon
    async function logTokens() {
        const accessToken = await SecureStore.getItemAsync(secureStoreKeys.accessToken);
        const refreshToken = await SecureStore.getItemAsync(secureStoreKeys.refreshToken);

        console.log(`accessToken ${accessToken}\nrefreshToken ${refreshToken}`);
    }

    // TEMP FUNCTION
    async function logout() {
        const user = await getUser();
        const accessToken = await SecureStore.getItemAsync(secureStoreKeys.accessToken);

        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
            body: JSON.stringify({ userId: user.userId })
        });

        if (response.ok) {
            await clearUser();
        }
    }

    // // TODO: remove if not needed with wayfinder:// deep linking scheme
    // useEffect(() => {
    //     const sub = Linking.addEventListener("url", ({ url }) => {
    //         const { queryParams } = Linking.parse(url);
    //         const oneTimeCode = queryParams?.code;

    //         if (oneTimeCode) {
    //             console.log(`One time code is:\n${oneTimeCode}\n\n\n\n\n`);
    //             // loginWithCode() // (TODO: implement)
    //         }
    //     });

    //     return sub.remove();
    // }, []);

    return (
        <SafeAreaView style={globalStyles.appContainer}>
            <CustomHeader title="OAuth Login" showBackButton={false} />
            <View style={globalStyles.contentContainer}>
                <OAuthLoginView providerImage={googleImage} providerTitle="Google" onPress={makeRequest} />
                <PressableButton onPress={logTokens}>
                    <Text style={styles.homeButtonText}>LOG TOKENS</Text>
                </PressableButton>
                <PressableButton onPress={refreshTokens}>
                    <Text style={styles.homeButtonText}>REFRESH TOKENS</Text>
                </PressableButton>
                <PressableButton onPress={logout}>
                    <Text style={styles.homeButtonText}>LOG OUT</Text>
                </PressableButton>
            </View>
            <PressableButton style={styles.homeButtonView} buttonUpStyleOverride={styles.homeButtonUp} buttonDownStyleOverride={styles.homeButtonDown} onPress={gotoHomescreen}>
                <Text style={styles.homeButtonText}>BACK TO HOME</Text>
            </PressableButton>
        </SafeAreaView>
    );
}
