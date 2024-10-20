import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    redirect(res: Response): void;
    callback(query: {
        code: string;
        state: string;
    }, res: Response): Promise<void | Response<any, Record<string, any>>>;
    getUser(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
    getUsers(token: any, query: any, res: Response): Promise<Response<any, Record<string, any>>>;
    searchUsers(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
