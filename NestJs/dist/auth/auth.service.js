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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const user_entity_1 = require("../database/entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.accessToken = null;
        this.clientId = process.env.CLIENT_ID;
        this.clientSecret = process.env.CLIENT_SECRET;
        this.redirectUri = process.env.REDIRECT_URI;
        this.state = process.env.STATE;
    }
    async saveUser(user) {
        return this.userRepository.save(user);
    }
    async createUser(name, email) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return existingUser;
        }
        const user = this.userRepository.create({ name, email });
        return this.userRepository.save(user);
    }
    getAuthorizationUrl() {
        const authorizeUrl = `https://api.intra.42.fr/oauth/authorize?${new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            response_type: 'code',
            scope: 'public',
            state: this.state,
        }).toString()}`;
        return authorizeUrl;
    }
    async exchangeCodeForToken(code) {
        const tokenResponse = await axios_1.default.post('https://api.intra.42.fr/oauth/token', new URLSearchParams({
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
    async fetchUser(token) {
        const userResponse = await axios_1.default.get('https://api.intra.42.fr/v2/me', {
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
    async saveUserData(data, user) {
        user.grade = data.grade;
        user.level = data.level;
        user.campus = data.campus;
        user.image = data.image;
        user.location = data.location;
        user.blackholed_at = data.blackholed_at;
        user.begin_at = data.begin_at;
        user.skills = data.skills;
        user.login = data.login;
        user.displayName = data.displayName;
        await this.saveUser(user);
    }
    async fetchUsers(token, query) {
        const campusId = query.filter?.campus_id;
        const beginAt = query.filter?.begin_at;
        const pageSize = query.page?.size;
        const pageNumber = query.page?.number;
        const sort = query.sort;
        const apiUrl = `https://api.intra.42.fr/v2/cursus_users?filter[campus_id]=${campusId}&filter[begin_at]=${beginAt}&page[size]=${pageSize}&page[number]=${pageNumber}&sort=${sort}`;
        const response = await axios_1.default.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        for (const userData of response.data) {
            const userName = userData.user.login;
            const userEmail = userData.user.email;
            const user = await this.createUser(userName, userEmail);
            const dataToSave = {
                grade: userData.grade,
                level: userData.level,
                campus: userData.cursus.name,
                image: userData.user.image.link,
                location: userData.user.location ? userData.user.location : null,
                blackholed_at: userData.blackholed_at,
                begin_at: userData.begin_at,
                skills: userData.skills,
                login: userData.user.login,
                displayName: userData.user.displayname,
            };
            await this.saveUserData(dataToSave, user);
        }
        return response.data;
    }
    getState() {
        return this.state;
    }
    async searchUsers(login) {
        return this.userRepository.findOne({ where: { login } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map