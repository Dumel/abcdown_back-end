"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessorModule = void 0;
const common_1 = require("@nestjs/common");
const professor_service_1 = require("./professor.service");
const professor_controller_1 = require("./professor.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_module_1 = require("../prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
let ProfessorModule = class ProfessorModule {
};
exports.ProfessorModule = ProfessorModule;
exports.ProfessorModule = ProfessorModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [professor_controller_1.ProfessorController],
        providers: [professor_service_1.ProfessorService, prisma_service_1.PrismaService, jwt_1.JwtService],
        exports: [professor_service_1.ProfessorService],
    })
], ProfessorModule);
//# sourceMappingURL=professor.module.js.map