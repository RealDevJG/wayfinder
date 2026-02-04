import { getJwtToken } from "../auth/user.repository";
import { refreshTokens } from "../auth/user.service";
import { secureStoreKeys } from "../utils/constants";
import { WAYFINDER_API_CLIENT } from "./clients";

let refreshPromise: Promise<void | null> | null = null;

export function setupAxiosInterceptors() {
	WAYFINDER_API_CLIENT.interceptors.request.use(
		async (config) => {
			console.log("Attaching access token");

			// TODO: use zustand to get token
			const accessToken = await getJwtToken(secureStoreKeys.accessToken);
			config.headers.Authorization = `Bearer ${accessToken}`;

			return config;
		},
		(err) => Promise.reject(err)
	);

	WAYFINDER_API_CLIENT.interceptors.response.use(
		(res) => res,
		async (err) => {
			const original = err.config as any;

			if (err.response?.status !== 401 || original._retry) {
				return Promise.reject(err);
			}

			original._retry = true;

			refreshPromise ??= refreshTokens().finally(() => {
				refreshPromise = null;
			});

			await refreshPromise;

			// TODO: replace with zustand to get accessToken
			const newToken = await getJwtToken(secureStoreKeys.accessToken);

			if (!newToken) {
				return Promise.reject(err);
			}

			original.headers.Authorization = `Bearer ${newToken}`;
			return WAYFINDER_API_CLIENT(original);
		}
	);
}
