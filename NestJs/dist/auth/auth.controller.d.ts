import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private clientId;
    private clientSecret;
    private redirectUri;
    private state;
    private accessToken;
    private baseUrl;
    constructor(authService: AuthService);
    redirect(res: Response): void;
    callback(code: string, state: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    getUser(res: Response): Promise<Response<any, Record<string, any>>>;
    getUsers(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
