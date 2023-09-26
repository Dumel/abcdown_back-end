"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decodificadora = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let Decodificadora = class Decodificadora {
    constructor() {
        this.secretKey = process.env.DATABASE_URL;
    }
    async decodificadorToken(token) {
        const [bearer, codigo] = token.split(' ');
        const decoded = (await jwt.verify(codigo, this.secretKey));
        const { id } = decoded;
        return id;
    }
};
exports.Decodificadora = Decodificadora;
exports.Decodificadora = Decodificadora = __decorate([
    (0, common_1.Injectable)()
], Decodificadora);
//# sourceMappingURL=descoficadorToken.js.map