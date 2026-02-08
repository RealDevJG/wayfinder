import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { AuthenticatedUser } from "../../common/types/authenticatedUser";
import { asyncStorageKeys, secureStoreKeys, SecureStoreTokens } from "../../common/utils/constants";
import { useUserStore } from "../../state/zustand/userStore";

export namespace UserRepository {
	export async function setUser(user: AuthenticatedUser) {
		await AsyncStorage.setItem(asyncStorageKeys.userId, user.userId);
		await AsyncStorage.setItem(asyncStorageKeys.username, user.username);

		await updateJwtTokens(user.accessToken, user.refreshToken);
	}

	export async function clearUser() {
		await AsyncStorage.removeItem(asyncStorageKeys.userId);
		await AsyncStorage.removeItem(asyncStorageKeys.username);

		await SecureStore.deleteItemAsync(secureStoreKeys.accessToken);
		await SecureStore.deleteItemAsync(secureStoreKeys.refreshToken);
	}

	export async function updateJwtTokens(accessToken: string, refreshToken: string) {
		await SecureStore.setItemAsync(secureStoreKeys.accessToken, accessToken);
		await SecureStore.setItemAsync(secureStoreKeys.refreshToken, refreshToken);
	}

	export async function getJwtToken(tokenType: SecureStoreTokens): Promise<string | null> {
		if (tokenType === secureStoreKeys.accessToken) {
			const accessToken = useUserStore.getState().tokenInfo?.accessToken;

			if (accessToken) {
				return accessToken;
			}
		}

		return await SecureStore.getItemAsync(tokenType);
	}
}
