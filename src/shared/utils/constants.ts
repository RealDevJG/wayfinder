const jwtTokenKeys = {
	accessToken: "access_token",
	refreshToken: "refresh_token"
} as const;

export type SecureStoreTokens = (typeof jwtTokenKeys)[keyof typeof jwtTokenKeys];

export namespace Constants {
	export const secureStoreKeys = {
		...jwtTokenKeys
	} as const;

	export const asyncStorageKeys = {
		userId: "user_id",
		username: "username"
	} as const;

	export const API_URL = process.env.EXPO_PUBLIC_API_URL;

	export const AXIOS_CONFIG = {
		baseURL: API_URL,
		timeout: 5000
	};

	export const AUTO_SAVE_MS = 600;
}
