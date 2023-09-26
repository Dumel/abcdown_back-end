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
exports.AlunoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AlunoService = class AlunoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validacaoCpf(body) {
        const query = `select id from tbl_aluno where cpf = '${body.cpf}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoCodigoTurma(body) {
        const query = `select id from tbl_aluno where cpf = '${body.cpf}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoUsuario(body) {
        const query = `select id from tbl_aluno where usuario = '${body.usuario}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoID(id) {
        const sqlValidacaoId = `select * from tbl_aluno where id =${id}`;
        const resultValidacaoId = await this.prisma.$queryRawUnsafe(sqlValidacaoId);
        if (resultValidacaoId.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async validacaoInsercaoTurma(id) {
        const sqlValidacaoId = `select * from tbl_turma_aluno where id_aluno =${id}`;
        const resultValidacaoId = await this.prisma.$queryRawUnsafe(sqlValidacaoId);
        if (resultValidacaoId.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async create(newAluno) {
        const validacaoCpf = await this.validacaoCpf(newAluno);
        if (validacaoCpf.length === 0) {
            const validacaoUsuario = await this.validacaoUsuario(newAluno);
            if (validacaoUsuario.length === 0) {
                const aluno = `call procInsertAluno(
          '${newAluno.nome}',
          '${newAluno.cpf}',
          '${newAluno.data_nascimento}', 
          '${newAluno.foto}',
          '${newAluno.usuario}',
          '${newAluno.senha}',
          '${newAluno.id_responsavel}',
          '${newAluno.id_turma}',
          '${newAluno.id_genero}'
          )`;
                const id = `select * from tbl_aluno where id = LastIdAluno();`;
                const response = await this.prisma.$queryRawUnsafe(aluno);
                const idAluno = await this.prisma.$queryRawUnsafe(id);
                return {
                    aluno: idAluno,
                };
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    error: 'Usuário já cadastrado',
                }, common_1.HttpStatus.CONFLICT);
            }
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Cpf já cadastrado',
            }, common_1.HttpStatus.CONFLICT);
        }
    }
    async findAll() {
        const query = `
    SELECT
    tbl_aluno.id,
    tbl_aluno.nome,
    tbl_aluno.cpf,
    DATE_FORMAT(tbl_aluno.data_nascimento, '%d/%m/%Y') as data_nascimento,
    tbl_aluno.foto,
    tbl_aluno.usuario,
    tbl_aluno.senha,
    tbl_responsavel.nome as nome_responsavel,
    tbl_responsavel.email as email_responsavel,
    tbl_genero.nome AS nome_genero,
    tbl_telefone_responsavel.numero as numeroResponsavel,
    tbl_turma.nome as nomeTurma,
    tbl_turma.descricao 
    FROM
        tbl_aluno
    INNER JOIN
        tbl_responsavel ON tbl_aluno.id_responsavel = tbl_responsavel.id
    INNER JOIN
        tbl_genero ON tbl_responsavel.id_genero = tbl_genero.id
    INNER JOIN
        tbl_telefone_responsavel ON tbl_responsavel.id = tbl_telefone_responsavel.id_responsavel
    INNER JOIN 
        tbl_turma ON tbl_aluno.id_turma = tbl_turma.id;
`;
        const response = await this.prisma.$queryRawUnsafe(query);
        return response;
    }
    findOne(id) {
        return `This action returns a #${id} aluno`;
    }
    update(id, updateAlunoDto) {
        return `This action updates a #${id} aluno`;
    }
    remove(id) {
        return `This action removes a #${id} aluno`;
    }
};
exports.AlunoService = AlunoService;
exports.AlunoService = AlunoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlunoService);
//# sourceMappingURL=aluno.service.js.map