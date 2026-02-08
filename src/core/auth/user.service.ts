import { AuthInfo } from "../../common/types/authInfo";
import { AuthenticatedUser } from "../../common/types/authenticatedUser";
import { API_URL, secureStoreKeys } from "../../common/utils/constants";
import { useUserStore } from "../../state/zustand/userStore";
import { WAYFINDER_API_CLIENT, WAYFINDER_REFRESH_API_CLIENT } from "../api/axios/clients";
import { UserRepository } from "./user.repository";

export namespace UserService {
	export async function login(code: string) {
		WAYFINDER_API_CLIENT.post("/auth/exchange", { code }).then(async (res) => {
			const user: AuthenticatedUser = await res.data;
			await UserRepository.setUser(user);

			const accessToken = await UserRepository.getJwtToken(secureStoreKeys.accessToken);
			useUserStore.getState().login(user, { accessToken });
		});
	}

	export async function logout() {
		const user = useUserStore.getState().user;

		if (!user) {
			return;
		}

		await WAYFINDER_API_CLIENT.post(`${API_URL}/auth/logout`, { userId: user.userId }).then(async () => {
			await UserRepository.clearUser();
			useUserStore.getState().logout();
		});
	}

	export async function refreshTokens(): Promise<void | null> {
		const user = useUserStore.getState().user;
		const refreshToken = await UserRepository.getJwtToken(secureStoreKeys.refreshToken);

		if (!user) {
			return null;
		}

		return WAYFINDER_REFRESH_API_CLIENT.post("/auth/refresh", { userId: user.userId, refreshToken }).then(async (res) => {
			const { accessToken, refreshToken }: AuthInfo = await res.data;

			useUserStore.getState().setTokenInfo({ accessToken });
			await UserRepository.updateJwtTokens(accessToken, refreshToken);
		});
	}
}
