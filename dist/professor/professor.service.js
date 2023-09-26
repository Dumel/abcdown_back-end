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
exports.ProfessorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const descoficadorToken_1 = require("../descoficadorToken");
let ProfessorService = class ProfessorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validacaoCpf(body) {
        const query = `select id from tbl_professor where cpf = '${body.cpf}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoEmail(body) {
        const query = `select id from tbl_professor where email = '${body.email}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoID(id) {
        const sqlValidacaoId = `select * from tbl_professor where id =${id}`;
        const resultValidacaoId = await this.prisma.$queryRawUnsafe(sqlValidacaoId);
        if (resultValidacaoId.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async create(body) {
        const validacaoCpf = await this.validacaoCpf(body);
        if (validacaoCpf.length === 0) {
            const validacaoEmail = await this.validacaoEmail(body);
            if (validacaoEmail.length === 0) {
                const newProfessor = `call procInsertProfessor(
          '${body.nome}',
          '${body.cpf}',
          '${body.data_nascimento}', 
          '${body.foto}',
          '${body.email}',
          '${await bcrypt.hash(body.senha, 10)}',
          '${body.id_genero}',
          '${body.numero}',
          '${body.cep}',
          '${body.numeroTelefone}'
          )`;
                const id = `select * from tbl_professor where id = LastIdProfessor();`;
                const endereco = `select * from tbl_endereco_professor where id_professor = LastIdProfessor();`;
                const telefone = `select * from tbl_telefone_professor where id_professor = LastIdProfessor();`;
                const response = await this.prisma.$queryRawUnsafe(newProfessor);
                const idProfessor = await this.prisma.$queryRawUnsafe(id);
                const enderecoProfessor = await this.prisma.$queryRawUnsafe(endereco);
                const telefoneProfessor = await this.prisma.$queryRawUnsafe(telefone);
                return {
                    professor: idProfessor,
                    endereco: enderecoProfessor,
                    telefone: telefoneProfessor,
                };
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.CONFLICT,
                    error: 'E-mail já cadastrado',
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
    tbl_professor.id,
    tbl_professor.nome,
    tbl_professor.cpf,
    DATE_FORMAT(tbl_professor.data_nascimento, '%d/%m/%Y') AS data_nascimento,
    tbl_professor.foto,
    tbl_professor.email,
    tbl_professor.senha,
    tbl_endereco_professor.numero,
    tbl_endereco_professor.cep,
    tbl_genero.nome AS nome_genero,
    tbl_telefone_professor.numero AS numeroProfessor
    FROM
        tbl_professor
    INNER JOIN
        tbl_endereco_professor ON tbl_professor.id = tbl_endereco_professor.id_professor
    INNER JOIN
        tbl_genero ON tbl_professor.id_genero = tbl_genero.id
    INNER JOIN
        tbl_telefone_professor ON tbl_professor.id = tbl_telefone_professor.id_professor;
`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async findOne(token) {
        const decodificador = new descoficadorToken_1.Decodificadora();
        const idUser = await decodificador.decodificadorToken(token);
        if (decodificador) {
            const query = `SELECT
    tbl_professor.id,
    tbl_professor.nome,
    tbl_professor.cpf,
    DATE_FORMAT(tbl_professor.data_nascimento, '%d/%m/%Y') AS data_nascimento,
    tbl_professor.foto,
    tbl_professor.email,
    tbl_professor.senha,
    tbl_endereco_professor.numero,
    tbl_endereco_professor.cep,
    tbl_genero.nome AS nome_genero,
    tbl_telefone_professor.numero AS numeroProfessor
    FROM
        tbl_professor
    INNER JOIN
        tbl_endereco_professor ON tbl_professor.id = tbl_endereco_professor.id_professor
    INNER JOIN
        tbl_genero ON tbl_professor.id_genero = tbl_genero.id
    INNER JOIN
        tbl_telefone_professor ON tbl_professor.id = tbl_telefone_professor.id_professor
     where tbl_professor.id = ${idUser}`;
            const result = await this.prisma.$queryRawUnsafe(query);
            const response = await this.prisma.$queryRawUnsafe(query);
            if (response.length !== 0) {
                return result;
            }
            else {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.NOT_FOUND,
                    error: 'Professor não encontrado',
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
    async findByEmail(email) {
        const sql = `SELECT * FROM tbl_professor WHERE email = ?`;
        const result = await this.prisma.$queryRawUnsafe(sql, email);
        return result[0] || null;
    }
    async update(id, body) {
        const validacaoId = await this.validacaoID(id);
        if (validacaoId == false) {
            return false;
        }
        const query = `call procUpdateProfessor(
     ${id},
     '${body.nome}',
     '${body.cpf}',
     '${body.data_nascimento}', 
     '${body.foto}',
     '${body.email}',
     '${body.senha}',
     ${body.id_genero},
     '${body.numero}',
     '${body.cep}',
     '${body.numeroTelefone}')`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return { mesnsagem: 'Professor editado com sucesso!', result };
    }
    async remove(id) {
        const validacaoId = await this.validacaoID(id);
        if (validacaoId == false) {
            return 'Professor não encontrado';
        }
        const query = `call procDeleteProfessor(${id})`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return 'Registro deletado com sucesso';
    }
};
exports.ProfessorService = ProfessorService;
exports.ProfessorService = ProfessorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfessorService);
//# sourceMappingURL=professor.service.js.map