import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from 'src/prisma/prisma.service';
interface AlunoParams {
    nome: string;
    cpf: string;
    data_nascimento: string;
    foto: string;
    usuario: string;
    senha: string;
    id_genero: number;
    id_responsavel: number;
    id_turma: number;
}
export declare class AlunoService {
    private prisma;
    constructor(prisma: PrismaService);
    validacaoCpf(body: AlunoParams): Promise<[]>;
    validacaoCodigoTurma(body: AlunoParams): Promise<[]>;
    validacaoUsuario(body: AlunoParams): Promise<[]>;
    validacaoID(id: number): Promise<boolean>;
    validacaoInsercaoTurma(id: number): Promise<boolean>;
    create(newAluno: CreateAlunoDto): Promise<{
        aluno: unknown;
    }>;
    findAll(): Promise<unknown>;
    findOne(id: number): string;
    update(id: number, updateAlunoDto: UpdateAlunoDto): string;
    remove(id: number): string;
}
export {};
