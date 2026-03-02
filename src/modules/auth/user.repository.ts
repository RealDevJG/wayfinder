import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Constants, SecureStoreTokens } from "../../shared/utils/constants";
import { useUserStore } from "../../state/zustand/userStore";
import { AuthenticatedUser } from "./domain/authenticatedUser";
import { UserProfile } from "./domain/userProfile";

export namespace UserRepository {
	export async function getUser(): Promise<UserProfile | null> {
		// prettier-ignore
		const [userId, username] = await Promise.all([
			AsyncStorage.getItem(Constants.asyncStorageKeys.userId),
			AsyncStorage.getItem(Constants.asyncStorageKeys.username)
		]);

		if (!userId || !username) {
			return null;
		}

		return { userId, username };
	}

	export async function setUser(user: AuthenticatedUser) {
		// prettier-ignore
		await Promise.all([
			AsyncStorage.setItem(Constants.asyncStorageKeys.userId, user.userId),
			AsyncStorage.setItem(Constants.asyncStorageKeys.username, user.username),
			updateJwtTokens(user.accessToken, user.refreshToken)
		]);
	}

	export async function clearUser() {
		await Promise.all([
			AsyncStorage.removeItem(Constants.asyncStorageKeys.userId),
			AsyncStorage.removeItem(Constants.asyncStorageKeys.username),
			SecureStore.deleteItemAsync(Constants.secureStoreKeys.accessToken),
			SecureStore.deleteItemAsync(Constants.secureStoreKeys.refreshToken)
		]);
	}

	export async function updateJwtTokens(accessToken: string, refreshToken: string) {
		// prettier-ignore
		await Promise.all([
			SecureStore.setItemAsync(Constants.secureStoreKeys.accessToken, accessToken),
			SecureStore.setItemAsync(Constants.secureStoreKeys.refreshToken, refreshToken)
		]);
	}

	export async function getJwtToken(tokenType: SecureStoreTokens): Promise<string | null> {
		if (tokenType === Constants.secureStoreKeys.accessToken) {
			const accessToken = useUserStore.getState().tokenInfo?.accessToken;

			if (accessToken) {
				return accessToken;
			}
		}

		return await SecureStore.getItemAsync(tokenType);
	}
}
