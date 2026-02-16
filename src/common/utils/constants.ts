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

// TODO: change url depending on production vs development builds in eas env vars
export const API_URL = "https://wayfinder.devjg.duckdns.org/api";
// export const API_URL = "https://dev1.devjg.duckdns.org/api";

export const AXIOS_CONFIG = {
	baseURL: API_URL,
	timeout: 5000
};
