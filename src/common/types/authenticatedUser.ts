export interface AuthenticatedUser {
    userId: string;
    username: string;
    accessToken: string;
    refreshToken: string;
}
