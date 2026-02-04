import { WAYFINDER_REFRESH_API_CLIENT } from "../api/clients";
import { LoginTokens } from "../types/loginTokens";
import { LoginUser } from "../types/loginUser";
import { secureStoreKeys } from "../utils/constants";
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

	return WAYFINDER_REFRESH_API_CLIENT.post("/auth/refresh", { userId: user.id, refreshToken }).then(async (res) => {
		const newTokens: LoginTokens = await res.data;
		await updateJwtTokens(newTokens.accessToken, newTokens.refreshToken);
	});
}
