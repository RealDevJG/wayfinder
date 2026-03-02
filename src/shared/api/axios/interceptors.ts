import { UserRepository } from "../../../modules/auth/user.repository";
import { services } from "../../../modules/ServiceManager";
import { Constants } from "../../utils/constants";
import { WAYFINDER_API_CLIENT } from "./clients";

let refreshPromise: Promise<void | null> | null = null;

type PatchedAxios = typeof WAYFINDER_API_CLIENT & {
	_requestInterceptorId?: number;
	_responseInterceptorId?: number;
};

export function setupAxiosInterceptors() {
	const apiClient = WAYFINDER_API_CLIENT as PatchedAxios;

	cleanupInterceptors(apiClient);

	apiClient._requestInterceptorId = WAYFINDER_API_CLIENT.interceptors.request.use(
		async (config) => {
			const accessToken = await UserRepository.getJwtToken(Constants.secureStoreKeys.accessToken);
			config.headers.Authorization = `Bearer ${accessToken}`;

			return config;
		},
		(err) => Promise.reject(err)
	);

	apiClient._responseInterceptorId = WAYFINDER_API_CLIENT.interceptors.response.use(
		(res) => res,
		async (err) => {
			const original = err.config as any;

			if (err.response?.status !== 401 || original._retry) {
				return Promise.reject(err);
			}

			original._retry = true;

			refreshPromise ??= services.userService.refreshTokens().finally(() => {
				refreshPromise = null;
			});

			await refreshPromise;

			const newToken = await UserRepository.getJwtToken(Constants.secureStoreKeys.accessToken);

			if (!newToken) {
				return Promise.reject(err);
			}

			original.headers.Authorization = `Bearer ${newToken}`;
			return WAYFINDER_API_CLIENT(original);
		}
	);

	return () => cleanupInterceptors(apiClient);
}

// Fixes bug where hot-reloading causes multiple interceptors to register at once
function cleanupInterceptors(apiClient: PatchedAxios) {
	// "!== undefined" is required because IDs start at 0, which is falsey
	if (apiClient._requestInterceptorId !== undefined) {
		apiClient.interceptors.request.eject(apiClient._requestInterceptorId);
	}

	if (apiClient._responseInterceptorId !== undefined) {
		apiClient.interceptors.response.eject(apiClient._responseInterceptorId);
	}
}
