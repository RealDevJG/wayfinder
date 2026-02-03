import { LoginTokens } from "../types/loginTokens";
import { LoginUser } from "../types/loginUser";
import { API_URL, secureStoreKeys } from "../utils/constants";
import { clearUser, getJwtToken, getUser, setUser, updateJwtTokens } from "./user.repository";

export async function login(user: LoginUser) {
	await setUser(user);
	// TODO: set user in zustand DO NOT PUT REFRESH TOKEN, SO CONSTRUCT NEW USER
}

export async function logout() {
	await clearUser();
	// TODO: clear user from zustand
}

export async function refreshTokens() {
	const user = await getUser();
	const refreshToken = await getJwtToken(secureStoreKeys.refreshToken);

    // TODO: replace with axios
	const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userId: user.userId, refreshToken })
	});

    if (response.ok) {
		const newTokens: LoginTokens = await response.json();
		await updateJwtTokens(newTokens.accessToken, newTokens.refreshToken);
	}
}
