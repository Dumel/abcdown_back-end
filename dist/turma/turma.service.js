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
exports.TurmaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TurmaService = class TurmaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validacaoID(tabela, id) {
        const sqlValidacaoId = `select * from ${tabela} where id =${id}`;
        const resultValidacaoId = await this.prisma.$queryRawUnsafe(sqlValidacaoId);
        if (resultValidacaoId.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async create(body) {
        const validacaoId = await this.validacaoID('tbl_professor', body.id_professor);
        if (validacaoId == false) {
            return 'Id do professor não foi econtrado';
        }
        const query = `call procInsertTurma(
      '${body.nome}',
      '${body.descricao}',
      ${body.id_professor},
      '${body.codigoTurma}'
    )`;
        const response = await this.prisma.$queryRawUnsafe(query);
        return 'Turma criada com sucesso';
    }
    async findAll() {
        const query = `select 
    tbl_turma.id,
    tbl_turma.nome,
    tbl_turma.descricao,
    tbl_turma.codigo_turma,
    tbl_turma.id_professor,
    tbl_professor.nome as nomeProfessor
    
    from tbl_turma
    
    Inner Join tbl_professor ON tbl_professor.id = tbl_turma.id_professor;`;
        const responseValidation = await this.prisma.$queryRawUnsafe(query);
        if (responseValidation.length !== 0) {
            const result = await this.prisma.$queryRawUnsafe(query);
            return result;
        }
        else {
            return 'Nenhum registro foi encontrado no servidor.';
        }
    }
    async findOne(id) {
        const validacaoIdTurma = await this.validacaoID('tbl_turma', id);
        if (validacaoIdTurma == false) {
            return `Não foi encontrado nenhum registro de turma com este ID: ${id} `;
        }
        const query = `select 
    tbl_turma.id,
    tbl_turma.nome,
    tbl_turma.descricao,
    tbl_turma.codigo_turma,
    tbl_turma.id_professor,
    tbl_professor.nome as nomeProfessor
    
    from tbl_turma
     
    Inner Join tbl_professor ON tbl_professor.id = tbl_turma.id_professor 
    where tbl_turma.id = ${id};`;
        return {
            response: await this.prisma.$queryRawUnsafe(query),
        };
    }
    async update(id, body) {
        const validacaoIdTurma = await this.validacaoID('tbl_turma', id);
        if (validacaoIdTurma == false) {
            return `Não foi encontrado nenhum registro de turma com este ID: ${id} `;
        }
        const query = `call procUpdateTurma(
      ${id},
      '${body.nome}',
      '${body.descricao}',
      ${body.id_professor}
      );`;
        const response = await this.prisma.$queryRawUnsafe(query);
        return 'Registro de turma atualizado com suscesso!';
    }
    async remove(id) {
        const validacaoIdTurma = await this.validacaoID('tbl_turma', id);
        if (validacaoIdTurma == false) {
            return `Não foi encontrado nenhum registro de turma com este ID: ${id} `;
        }
        const query = `call procprocDeleteTurma(${id});`;
        return 'Registro de turma deletado com sucesso!';
    }
};
exports.TurmaService = TurmaService;
exports.TurmaService = TurmaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TurmaService);
//# sourceMappingURL=turma.service.js.map