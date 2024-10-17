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
    getUser(res: Response): Promise<Response<any, Record<string, any>>>;
    getUsers(query: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
