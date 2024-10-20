import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    private clientId;
    private clientSecret;
    private redirectUri;
    private state;
    private accessToken;
    constructor(userRepository: Repository<User>);
    saveUser(user: User): Promise<User>;
    createUser(name: string, email: string): Promise<User>;
    getAuthorizationUrl(): string;
    exchangeCodeForToken(code: string): Promise<string>;
    fetchUser(token: string): Promise<any>;
    saveUserData(data: any, user: User): Promise<void>;
    fetchUsers(token: string, query: any): Promise<any>;
    getState(): string;
    searchUsers(login: string): Promise<any>;
}
