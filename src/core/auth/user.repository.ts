import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { AuthenticatedUser } from "../../common/types/authenticatedUser";
import { UserProfile } from "../../common/types/userProfile";
import { asyncStorageKeys, secureStoreKeys, SecureStoreTokens } from "../../common/utils/constants";
import { useUserStore } from "../../state/zustand/userStore";

export namespace UserRepository {
	export async function getUser(): Promise<UserProfile | null> {
		// prettier-ignore
		const [userId, username] = await Promise.all([
			AsyncStorage.getItem(asyncStorageKeys.userId),
			AsyncStorage.getItem(asyncStorageKeys.username)
		]);

		if (!userId || !username) {
			return null;
		}

		return { userId, username };
	}

	export async function setUser(user: AuthenticatedUser) {
		// prettier-ignore
		await Promise.all([
			AsyncStorage.setItem(asyncStorageKeys.userId, user.userId),
			AsyncStorage.setItem(asyncStorageKeys.username, user.username),
			updateJwtTokens(user.accessToken, user.refreshToken)
		]);
	}

	export async function clearUser() {
		await Promise.all([
			AsyncStorage.removeItem(asyncStorageKeys.userId),
			AsyncStorage.removeItem(asyncStorageKeys.username),
			SecureStore.deleteItemAsync(secureStoreKeys.accessToken),
			SecureStore.deleteItemAsync(secureStoreKeys.refreshToken)
		]);
	}

	export async function updateJwtTokens(accessToken: string, refreshToken: string) {
		// prettier-ignore
		await Promise.all([
			SecureStore.setItemAsync(secureStoreKeys.accessToken, accessToken),
			SecureStore.setItemAsync(secureStoreKeys.refreshToken, refreshToken)
		]);
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
