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
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    redirect(res) {
        const authorizeUrl = this.authService.getAuthorizationUrl();
        return res.redirect(authorizeUrl);
    }
    async callback(query, res) {
        const { code, state } = query;
        if (state !== this.authService.getState()) {
            return res.status(common_1.HttpStatus.FORBIDDEN).send('Forbidden');
        }
        try {
            await this.authService.exchangeCodeForToken(code);
            return res.redirect('/auth/intra');
        }
        catch (error) {
            console.error('Error exchanging code for access token', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    async getUser(res) {
        try {
            const userData = await this.authService.fetchUser();
            return res.json(userData);
        }
        catch (error) {
            console.error('Error fetching user', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
        }
    }
    async getUsers(query, res) {
        try {
            const usersData = await this.authService.fetchUsers(query);
            return res.json(usersData);
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
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
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