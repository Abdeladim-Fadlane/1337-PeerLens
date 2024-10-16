import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private configService: ConfigService) {}

    getClientId() {
        return this.configService.get('CLIENT_ID');
    }
    getClientSecret() {
        return this.configService.get('CLIENT_SECRET');
    }
    getRedirectUri() {
        return this.configService.get('REDIRECT_URI');
    }
    getState() {
        return this.configService.get('STATE');
    }

}