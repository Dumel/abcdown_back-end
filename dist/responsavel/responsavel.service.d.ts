import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
interface ResponsavelParams {
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
export declare class ResponsavelService {
    private prisma;
    constructor(prisma: PrismaService);
    validacaoCpf(body: ResponsavelParams): Promise<[]>;
    validacaoEmail(body: ResponsavelParams): Promise<[]>;
    validacaoID(id: number): Promise<boolean>;
    create(createResponsavel: ResponsavelParams): Promise<{
        responsavel: unknown;
        endereco: unknown;
    }>;
    findAll(): Promise<unknown>;
    findOne(id: number): Promise<unknown>;
    findByEmail(email: string): Promise<any>;
    update(id: number, body: UpdateResponsavelDto): Promise<false | {
        mesnsagem: string;
        result: unknown;
    }>;
    remove(id: number): Promise<"Responsável não encontrado" | "Registro deletado com sucesso">;
}
export {};
