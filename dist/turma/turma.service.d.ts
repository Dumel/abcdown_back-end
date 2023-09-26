import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TurmaService {
    private prisma;
    constructor(prisma: PrismaService);
    validacaoID(tabela: string, id: number): Promise<boolean>;
    create(body: CreateTurmaDto): Promise<"Id do professor não foi econtrado" | "Turma criada com sucesso">;
    findAll(): Promise<unknown>;
    findOne(id: number): Promise<string | {
        response: unknown;
    }>;
    update(id: number, body: UpdateTurmaDto): Promise<string>;
    remove(id: number): Promise<string>;
}
