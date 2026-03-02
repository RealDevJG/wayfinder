import { WAYFINDER_API_CLIENT, WAYFINDER_REFRESH_API_CLIENT } from "../../shared/api/axios/clients";
import { Constants } from "../../shared/utils/constants";
import { useUserStore } from "../../state/zustand/userStore";
import { AuthInfo } from "./domain/authInfo";
import { AuthenticatedUser } from "./domain/authenticatedUser";
import { UserRepository } from "./user.repository";

export class UserService {
	constructor(private readonly userUpdated: Function) {
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	async login(code: string): Promise<void> {
		// prettier-ignore
		return WAYFINDER_API_CLIENT.post("/auth/exchange", { code })
			.then(async (res) => {
				const user: AuthenticatedUser = res.data;
				await UserRepository.setUser(user);

				const accessToken = user.accessToken;
				useUserStore.getState().login(user, { accessToken });
			})
			.finally(() => this.userUpdated());
	}

	async logout(): Promise<any> {
		const user = useUserStore.getState().user;

		if (!user) {
			return Promise.resolve();
		}

		// prettier-ignore
		return WAYFINDER_API_CLIENT.post("/auth/logout")
			.finally(async () => { // using finally so even if the server fails to recieve the logout call, the user is still logged out
				await UserRepository.clearUser();
				useUserStore.getState().logout();
				this.userUpdated();
			});
	}

	async refreshTokens(): Promise<void> {
		const user = useUserStore.getState().user;
		const refreshToken = await UserRepository.getJwtToken(Constants.secureStoreKeys.refreshToken);

		if (!user) {
			return Promise.resolve();
		}

		// prettier-ignore
		return WAYFINDER_REFRESH_API_CLIENT.post("/auth/refresh", { userId: user.userId, refreshToken })
			.then(async (res) => {
				const { accessToken, refreshToken }: AuthInfo = res.data;

				useUserStore.getState().setTokenInfo({ accessToken });
				await UserRepository.updateJwtTokens(accessToken, refreshToken);
			});
	}

	// re-logs user in after the app restarts using info already on-device
	async loginWithStorageData() {
		const userProfile = await UserRepository.getUser();
		const accessToken = await UserRepository.getJwtToken(Constants.secureStoreKeys.accessToken);

		useUserStore.getState().login(userProfile, { accessToken });
	}
}
