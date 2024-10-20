import { Controller, Get, Query, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { query, Response } from 'express';

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
            const token : string  = await this.authService.exchangeCodeForToken(code);
            return res.redirect('/auth/intra?token=' + token);
        } catch (error) {
            console.error('Error exchanging code for access token', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    

    @Post('user')
    async getUser(@Body() query:any,@Res() res: Response) {

        const token = query.token;
        try {
            const userData = await this.authService.fetchUser(token);
            return res.json(userData);
        } catch (error) {
            console.error('Error fetching user', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }

    @Post('users')
    async getUsers(@Body() token:any , @Query() query: any, @Res() res: Response) {
        const accessToken = token.token;
        if (!accessToken) {
            return res.status(HttpStatus.UNAUTHORIZED).send('Unauthorized');    
        }
        try {
            const usersData = await this.authService.fetchUsers(accessToken, query);
            return res.json(usersData);
        } catch (error) {
            console.error('Failed to fetch users data:', error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    
    @Get('search')
    async searchUsers(@Query() query:any, @Res() res: Response) {
        try {       
            const name = query.login;
            const usersData = await this.authService.searchUsers(name);
            return res.json(usersData);
        } catch (error) {
            console.error('Failed to search users:', error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
}
