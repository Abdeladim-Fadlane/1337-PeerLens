import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

@Injectable()
export class AuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private state: string;
    private accessToken: string | null = null;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,) {
        this.clientId = process.env.CLIENT_ID; 
        this.clientSecret = process.env.CLIENT_SECRET;
        this.redirectUri = process.env.REDIRECT_URI;
        this.state = process.env.STATE;
    }

    async saveUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async createUser(name: string, email: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return existingUser; 
        }
        
        const user = this.userRepository.create({ name, email });
        return this.userRepository.save(user);
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

    async fetchUser(token:string): Promise<any> {
        const userResponse = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const userName = userResponse.data.login;
        const userEmail = userResponse.data.email;
        const user = await this.createUser(userName, userEmail);
        this.accessToken = token;
        user.accessToken = this.accessToken;
        await this.saveUser(user);

        return userResponse.data;

    }

    async saveUserData(data: any, user: User): Promise<void> {
        user.user_id = data.user_id;
        user.login = data.login;
        await this.saveUser(user);
    }
    
    async fetchUsers(token:string,query: any): Promise<any> {
        const campusId = query.filter?.campus_id;
        const beginAt = query.filter?.begin_at;
        const pageSize = query.page?.size;
        const pageNumber = query.page?.number;
        const sort = query.sort;
    
        const apiUrl = `https://api.intra.42.fr/v2/cursus_users?filter[campus_id]=${campusId}&filter[begin_at]=${beginAt}&page[size]=${pageSize}&page[number]=${pageNumber}&sort=${sort}`;
    
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        for (const userData of response.data) {
            const userName = userData.user.login;
            const userEmail = userData.user.email;

            const user = await this.createUser(userName, userEmail);
            const dataToSave = {
                user_id: userData.user.id,
                login: userData.user.login,
            };
            await this.saveUserData(dataToSave, user);
        }
        return response.data;
    }
    
    getState(): string {
        return this.state;
    }

    async searchUsers(login: string): Promise<any> {
        const user = this.userRepository.findOne({ where: { login } });
        let id :any;
        try {
            id = (await user).user_id;
        }
        catch (error) {
            return null;
        }
       
        const response = await axios.get(`https://api.intra.42.fr/v2/users/${id}`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        });
        return response.data;
    }
}
