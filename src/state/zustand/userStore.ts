import { create } from "zustand/react";
import { UserProfile } from "../../common/types/userProfile";

type UserStoreTokenInfo = {
	accessToken: string | null;
};

// Splitting user and tokenInfo means something like useUserStore((state) => state.user)
// will not trigger rerendering when tokenInfo is changed, unless that variable has been hooked
// as well via useUserStore((state) => state.user)
type UserStoreState = {
	user: UserProfile | null;
	tokenInfo: UserStoreTokenInfo | null;
};

type UserStoreActions = {
	setUser: (newUser: UserStoreState["user"]) => void;
	setTokenInfo: (newTokenInfo: UserStoreState["tokenInfo"]) => void;

	login: (user: UserStoreState["user"], tokenInfo: UserStoreState["tokenInfo"]) => void;
	logout: () => void;
};

export const useUserStore = create<UserStoreState & UserStoreActions>()((set) => ({
	user: null,
	tokenInfo: null,

	setUser: (newUser) => set({ user: newUser }),
	setTokenInfo: (newTokenInfo) => set({ tokenInfo: newTokenInfo }),

	login: (user, tokenInfo) => {
		set({
			user,
			tokenInfo
		});
	},

	logout: () => {
		set({
			user: null,
			tokenInfo: null
		});
	}
}));
