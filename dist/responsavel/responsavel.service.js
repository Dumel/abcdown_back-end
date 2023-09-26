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
exports.ResponsavelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ResponsavelService = class ResponsavelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validacaoCpf(body) {
        const query = `select id from tbl_responsavel where cpf = '${body.cpf}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoEmail(body) {
        const query = `select id from tbl_responsavel where email = '${body.email}';`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async validacaoID(id) {
        const sqlValidacaoId = `select * from tbl_responsavel where id =${id}`;
        const resultValidacaoId = await this.prisma.$queryRawUnsafe(sqlValidacaoId);
        if (resultValidacaoId.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async create(createResponsavel) {
        const validacaoCpf = await this.validacaoCpf(createResponsavel);
        if (validacaoCpf.length === 0) {
            const validacaoEmail = await this.validacaoEmail(createResponsavel);
            if (validacaoEmail.length === 0) {
                const responsavel = `call procInsertResponsaveis(
          '${createResponsavel.nome}',
          '${createResponsavel.cpf}',
          '${createResponsavel.data_nascimento}', 
          '${createResponsavel.foto}',
          '${createResponsavel.email}',
          '${createResponsavel.senha}',
          '${createResponsavel.id_genero}',
          '${createResponsavel.numero}',
          '${createResponsavel.cep}',
          '${createResponsavel.numeroTelefone}'
          )`;
                const id = `select * from tbl_responsavel where id = LastIdResponsavel();`;
                const endereco = `select * from tbl_endereco_professor where id_professor = LastIdProfessor();`;
                const response = await this.prisma.$queryRawUnsafe(responsavel);
                const idResponsavel = await this.prisma.$queryRawUnsafe(id);
                const enderecoResponsavel = await this.prisma.$queryRawUnsafe(endereco);
                return {
                    responsavel: idResponsavel,
                    endereco: enderecoResponsavel,
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
    tbl_responsavel.id,
    tbl_responsavel.nome,
    tbl_responsavel.cpf,
    tbl_responsavel.data_nascimento,
    tbl_responsavel.foto,
    tbl_responsavel.email,
    tbl_responsavel.senha,
    tbl_endereco_responsavel.numero,
    tbl_endereco_responsavel.cep,
    tbl_genero.nome AS nome_genero,
    tbl_telefone_responsavel.numero as numeroResponsavel
    FROM
        tbl_responsavel
    INNER JOIN
        tbl_endereco_responsavel ON tbl_responsavel.id = tbl_endereco_responsavel.id_responsavel
    INNER JOIN
    tbl_genero ON tbl_responsavel.id_genero = tbl_genero.id
    INNER join
    tbl_telefone_responsavel ON tbl_responsavel.id = tbl_telefone_responsavel.id_responsavel 
    order by id asc;`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return result;
    }
    async findOne(id) {
        const query = `
    SELECT
    tbl_responsavel.id,
    tbl_responsavel.nome,
    tbl_responsavel.cpf,
    tbl_responsavel.data_nascimento,
    tbl_responsavel.foto,
    tbl_responsavel.email,
    tbl_responsavel.senha,
    tbl_endereco_responsavel.numero,
    tbl_endereco_responsavel.cep,
    tbl_genero.nome AS nome_genero,
    tbl_telefone_responsavel.numero as numeroResponsavel
    FROM
        tbl_responsavel
    INNER JOIN
        tbl_endereco_responsavel ON tbl_responsavel.id = tbl_endereco_responsavel.id_responsavel
    INNER JOIN
    tbl_genero ON tbl_responsavel.id_genero = tbl_genero.id
    INNER join
    tbl_telefone_responsavel ON tbl_responsavel.id = tbl_telefone_responsavel.id_responsavel where tbl_responsavel.id = ${id}`;
        const result = await this.prisma.$queryRawUnsafe(query);
        const response = await this.prisma.$queryRawUnsafe(query);
        if (response.length !== 0) {
            return result;
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: 'Responsável não encontrado',
            }, common_1.HttpStatus.NOT_FOUND);
        }
    }
    async findByEmail(email) {
        const sql = `SELECT * FROM tbl_responsavel WHERE email = ?`;
        const result = await this.prisma.$queryRawUnsafe(sql, email);
        return result[0] || null;
    }
    async update(id, body) {
        const validacaoId = await this.validacaoID(id);
        if (validacaoId == false) {
            return false;
        }
        const query = `call procUpdateResponsavel(
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
        return { mesnsagem: 'Responsavel editado com sucesso!', result };
    }
    async remove(id) {
        const validacaoId = await this.validacaoID(id);
        if (validacaoId == false) {
            return 'Responsável não encontrado';
        }
        const query = `call procDeleteResponsavel(${id})`;
        const result = await this.prisma.$queryRawUnsafe(query);
        return 'Registro deletado com sucesso';
    }
};
exports.ResponsavelService = ResponsavelService;
exports.ResponsavelService = ResponsavelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResponsavelService);
//# sourceMappingURL=responsavel.service.js.map