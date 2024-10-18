import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { access } from 'fs';

@Injectable()
export class AuthService {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private state: string;
    private accessToken: string | null = null;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
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

    async fetchUser(): Promise<any> {
        if (!this.accessToken) {
            throw new Error('No access token');
        }

        const userResponse = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
            },
        });

        const userName = userResponse.data.login;
        const userEmail = userResponse.data.email;
        const user = await this.createUser(userName, userEmail);
        return userResponse.data;
    }

    async saveUserData(data: any, user: User): Promise<void> {
        user.grade = data.grade;
        user.level = data.level;
        user.campus = data.campus;
        user.image = data.image;
        user.location = data.location;
        user.available = data.available;
        user.blackholed_at = data.blackholed_at;
        user.begin_at = data.begin_at;
        user.project = data.project;
        user.skills = data.skills;
        user.achievements = data.acheivements;
        await this.userRepository.save(user);
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
    
        for (const userData of response.data) {
            const userName = userData.user.login;
            const userEmail = userData.user.email;
    
            // Create or retrieve the user
            const user = await this.createUser(userName, userEmail);
    
            // Prepare the data to save
            const dataToSave = {
                grade: userData.grade,
                level: userData.level,
                campus: userData.campus,
                image: userData.user.image.link,
                location: userData.user.location,
                available: userData.user.available,
                blackholed_at: userData.blackholed_at,
                begin_at: userData.begin_at,
                project: userData.project,
                skills: userData.skills,
                achievements: userData.achievements,
                accessToken: this.accessToken,
            };

            console.log(response.data);
            break;
            await this.saveUserData(dataToSave, user);
        }
        return response.data;
    }
    

    getState(): string {
        return this.state;
    }
}
