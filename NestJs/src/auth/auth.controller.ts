import { AuthService } from './auth.service';
import { Response } from 'express';
import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import qs from 'qs';

@Controller('auth')
export class AuthController {
    private clientId: string;
    private clientSecret: string;
    private redirectUri: string;
    private state: string;
    private accessToken: string | null = null; 
    private baseUrl = 'https://api.intra.42.fr/v2/cursus_users';

    constructor(private authService: AuthService) {
        this.clientId = this.authService.getClientId();
        this.clientSecret = this.authService.getClientSecret();
        this.redirectUri = this.authService.getRedirectUri();
        this.state = this.authService.getState();
    }

    @Get('redirect')
    redirect(@Res() res: Response) {
        const authorizeUrl = `https://api.intra.42.fr/oauth/authorize?${new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'public',
            state: this.state,
        }).toString()}`;

        return res.redirect(authorizeUrl);
    }
    
    @Get('callback')
    async callback(@Query('code') code: string, @Query('state') state: string, @Res() res: Response) {
        if (state !== this.state) {
            return res.status(HttpStatus.FORBIDDEN).send('Forbidden');
        }

        try {
            const tokenResponse = await axios.post('https://api.intra.42.fr/oauth/token', new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: this.redirectUri,
                client_id: this.clientId,
                client_secret: this.clientSecret
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            this.accessToken = tokenResponse.data.access_token;
            return res.redirect('/auth/intra'); // Adjust as needed

        } catch (error) {
            console.error('Error exchanging code for access token', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }

    @Get('user')
    async getUser(@Res() res: Response) {
        if (!this.accessToken) { // Check for null or undefined
            return res.status(HttpStatus.FORBIDDEN).send('Forbidden');
        }
        try {
            const userResponse = await axios.get('https://api.intra.42.fr/v2/me', {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
            return res.json(userResponse.data); // Use json() for consistency
        } catch (error) {
            console.error('Error fetching user', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }

    @Get('users') 
    async getUsers(@Query() query: any, @Res() res: Response) {
        try {
            const queryString = qs.stringify(query, { indices: true });
            const response = await axios.get(`${this.baseUrl}?${queryString}`, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });

            return res.json(response.data); // Return the data as JSON
        } catch (error) {
            console.error('Failed to fetch users data:', error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
}
