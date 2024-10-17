export declare class AuthService {
    private clientId;
    private clientSecret;
    private redirectUri;
    private state;
    private accessToken;
    constructor();
    getAuthorizationUrl(): string;
    exchangeCodeForToken(code: string): Promise<string>;
    fetchUser(): Promise<any>;
    fetchUsers(query: any): Promise<any>;
    getState(): string;
}
