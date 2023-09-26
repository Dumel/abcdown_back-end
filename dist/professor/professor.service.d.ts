import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export interface ProfessorParams {
    nome: string;
    cpf: string;
    email: string;
    data_nascimento: string;
    senha: string;
    foto: string;
    id_genero: number;
    numero: string;
    cep: string;
    numeroTelefone: string;
}
export declare class ProfessorService {
    private prisma;
    constructor(prisma: PrismaService);
    validacaoCpf(body: ProfessorParams): Promise<[]>;
    validacaoEmail(body: ProfessorParams): Promise<[]>;
    validacaoID(id: number): Promise<boolean>;
    create(body: CreateProfessorDto): Promise<{
        professor: unknown;
        endereco: unknown;
        telefone: unknown;
    }>;
    findAll(): Promise<unknown>;
    findOne(token: string): Promise<unknown>;
    findByEmail(email: string): Promise<any>;
    update(id: number, body: UpdateProfessorDto): Promise<false | {
        mesnsagem: string;
        result: unknown;
    }>;
    remove(id: number): Promise<"Registro deletado com sucesso" | "Professor não encontrado">;
}
