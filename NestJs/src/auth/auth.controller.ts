import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('redirect')
    redirect(@Res() res: Response) {
        const authorizeUrl = this.authService.getAuthorizationUrl();
        return res.redirect(authorizeUrl);
    }

    @Get('callback')
    async callback(@Query() query: { code: string; state: string }, @Res() res: Response) {
        const { code, state } = query;
        if (state !== this.authService.getState()) {
            return res.status(HttpStatus.FORBIDDEN).send('Forbidden');
        }
    
        try {
            await this.authService.exchangeCodeForToken(code);
            return res.redirect('/auth/intra');
        } catch (error) {
            console.error('Error exchanging code for access token', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    

    @Get('user')
    async getUser(@Res() res: Response) {
        try {
            const userData = await this.authService.fetchUser();
            return res.json(userData);
        } catch (error) {
            console.error('Error fetching user', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }

    @Get('users')
    async getUsers(@Query() query: any, @Res() res: Response) {
        try {
            const usersData = await this.authService.fetchUsers(query);
            return res.json(usersData);
        } catch (error) {
            console.error('Failed to fetch users data:', error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
}
