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
exports.ResponsavelController = void 0;
const common_1 = require("@nestjs/common");
const responsavel_service_1 = require("./responsavel.service");
const create_responsavel_dto_1 = require("./dto/create-responsavel.dto");
const update_responsavel_dto_1 = require("./dto/update-responsavel.dto");
let ResponsavelController = class ResponsavelController {
    constructor(responsavelService) {
        this.responsavelService = responsavelService;
    }
    async create(body) {
        return {
            dados: await this.responsavelService.create(body),
        };
    }
    async findAll() {
        return { responsaveis: await this.responsavelService.findAll() };
    }
    async findOne(id) {
        return {
            responsavel: await this.responsavelService.findOne(+id),
        };
    }
    async update(id, body) {
        const responseValidacao = await this.responsavelService.update(+id, body);
        if (responseValidacao == false) {
            return {
                mensagem: 'O responsável não foi encontrado',
            };
        }
        return {
            mensagem: await this.responsavelService.update(+id, body),
            id: id,
            dadosInseridos: [
                {
                    nome: body.nome,
                    cpf: body.cpf,
                    data_nascimento: body.data_nascimento,
                    foto: body.foto,
                    email: body.email,
                    senha: body.senha,
                    id_genero: body.id_genero,
                },
            ],
            telefone: { numero: body.numeroTelefone },
            endereco: { numero: body.numero, cep: body.cep },
        };
    }
    async remove(id) {
        return { message: await this.responsavelService.remove(+id) };
    }
};
exports.ResponsavelController = ResponsavelController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_responsavel_dto_1.CreateResponsavelDto]),
    __metadata("design:returntype", Promise)
], ResponsavelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResponsavelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResponsavelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_responsavel_dto_1.UpdateResponsavelDto]),
    __metadata("design:returntype", Promise)
], ResponsavelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResponsavelController.prototype, "remove", null);
exports.ResponsavelController = ResponsavelController = __decorate([
    (0, common_1.Controller)('responsavel'),
    __metadata("design:paramtypes", [responsavel_service_1.ResponsavelService])
], ResponsavelController);
//# sourceMappingURL=responsavel.controller.js.map