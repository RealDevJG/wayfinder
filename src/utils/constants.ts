const jwtTokenKeys = {
	accessToken: "access_token",
	refreshToken: "refresh_token"
} as const;

export const secureStoreKeys = {
	...jwtTokenKeys
} as const;

export type SecureStoreTokens = (typeof jwtTokenKeys)[keyof typeof jwtTokenKeys];

export const asyncStorageKeys = {
	userId: "user_id",
	username: "username"
} as const;

export const API_URL = "https://devjg.duckdns.org/api";
