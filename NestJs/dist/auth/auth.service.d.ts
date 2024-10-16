import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    constructor(configService: ConfigService);
    getClientId(): any;
    getClientSecret(): any;
    getRedirectUri(): any;
    getState(): any;
}
