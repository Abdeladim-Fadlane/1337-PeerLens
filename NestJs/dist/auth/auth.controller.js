"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.accessToken = null;
        this.baseUrl = 'https://api.intra.42.fr/v2/cursus_users';
        this.clientId = this.authService.getClientId();
        this.clientSecret = this.authService.getClientSecret();
        this.redirectUri = this.authService.getRedirectUri();
        this.state = this.authService.getState();
    }
    redirect(res) {
        const authorizeUrl = `https://api.intra.42.fr/oauth/authorize?${new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'public',
            state: this.state,
        }).toString()}`;
        return res.redirect(authorizeUrl);
    }
    async callback(code, state, res) {
        if (state !== this.state) {
            return res.status(common_1.HttpStatus.FORBIDDEN).send('Forbidden');
        }
        try {
            const tokenResponse = await axios_1.default.post('https://api.intra.42.fr/oauth/token', new URLSearchParams({
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
            return res.redirect('/auth/intra');
        }
        catch (error) {
            console.error('Error exchanging code for access token', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    async getUser(res) {
        if (!this.accessToken) {
            return res.status(common_1.HttpStatus.FORBIDDEN).send('Forbidden');
        }
        try {
            const userResponse = await axios_1.default.get('https://api.intra.42.fr/v2/me', {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
            return res.json(userResponse.data);
        }
        catch (error) {
            console.error('Error fetching user', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    async getUsers(query, res) {
        try {
            const campusId = query.filter.campus_id;
            const beginAt = query.filter?.begin_at;
            const pageSize = query.page.size;
            const pageNumber = query.page.number;
            const sort = query.sort;
            const apiUrl = `${this.baseUrl}?filter[campus_id]=${campusId}&filter[begin_at]=${beginAt}&page[size]=${pageSize}&page[number]=${pageNumber}&sort=${sort}`;
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
            });
            return res.json(response.data);
        }
        catch (error) {
            console.error('Failed to fetch users data:', error.message);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('redirect'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "redirect", null);
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)('code')),
    __param(1, (0, common_1.Query)('state')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUsers", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map