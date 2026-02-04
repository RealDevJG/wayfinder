import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { LoginUser } from "../types/loginUser";
import { asyncStorageKeys, SecureStoreTokens, secureStoreKeys } from "../utils/constants";
import { User } from "../types/user";

// TODO: remove "as strings" and replace with proper null checking
export async function getUser(): Promise<User> {
	const userId = (await AsyncStorage.getItem(asyncStorageKeys.userId)) as string;
	const username = (await AsyncStorage.getItem(asyncStorageKeys.username)) as string;

	return { userId, username };
}

export async function setUser(user: LoginUser) {
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
	return await SecureStore.getItemAsync(tokenType);
}
