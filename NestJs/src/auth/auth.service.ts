import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private state: string;
    private accessToken: string | null = null;

    constructor() {
        // Initialize these values from your environment or config
        this.clientId = process.env.CLIENT_ID; // or another way to fetch it
        this.clientSecret = process.env.CLIENT_SECRET;
        this.redirectUri = process.env.REDIRECT_URI;
        this.state = process.env.STATE;
    }

    getAuthorizationUrl(): string {
        const authorizeUrl = `https://api.intra.42.fr/oauth/authorize?${new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'public',
            state: this.state,
        }).toString()}`;
        return authorizeUrl;
    }

    async exchangeCodeForToken(code: string): Promise<string> {
        const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: this.redirectUri,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        this.accessToken = tokenResponse.data.access_token;
        return this.accessToken;
    }

    async fetchUser(): Promise<any> {
        if (!this.accessToken) {
            throw new Error('No access token');
        }
        const userResponse = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
            },
        });
        const user = new User();
        user.name = userResponse.data.login;
        user.email = userResponse.data.email;
        
        return userResponse.data;
    }

    async fetchUsers(query: any): Promise<any> {
        const campusId = query.filter?.campus_id;
        const beginAt = query.filter?.begin_at;
        const pageSize = query.page?.size;
        const pageNumber = query.page?.number;
        const sort = query.sort;
        const apiUrl = `https://api.intra.42.fr/v2/cursus_users?filter[campus_id]=${campusId}&filter[begin_at]=${beginAt}&page[size]=${pageSize}&page[number]=${pageNumber}&sort=${sort}`;

        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        });
        return response.data;
    }

    getState(): string {
        return this.state;
    }
}
