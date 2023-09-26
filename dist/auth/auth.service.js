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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const professor_service_1 = require("../professor/professor.service");
const responsavel_service_1 = require("../responsavel/responsavel.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(professorService, responsavelService, jwtService) {
        this.professorService = professorService;
        this.responsavelService = responsavelService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password, userType) {
        let user;
        if (userType === 'professor') {
            user = await this.professorService.findByEmail(email);
        }
        else if (userType === 'responsavel') {
            user = await this.responsavelService.findByEmail(email);
        }
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.senha);
            if (isPasswordValid) {
                return {
                    ...user,
                    senha: undefined,
                };
            }
        }
        throw new common_1.UnauthorizedException('E-mail ou senha estão incorretos');
    }
    loginProfessor(user) {
        const payload = {
            id: user.id,
            email: user.email,
        };
        const jwtToken = this.jwtService.sign(payload);
        return {
            acess_token: jwtToken,
        };
    }
    loginResponsavel(user) {
        const payload = {
            id: user.id,
            email: user.email,
        };
        const jwtToken = this.jwtService.sign(payload);
        return {
            acess_token: jwtToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [professor_service_1.ProfessorService,
        responsavel_service_1.ResponsavelService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map