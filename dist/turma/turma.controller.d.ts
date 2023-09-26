import { TurmaService } from './turma.service';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
export declare class TurmaController {
    private readonly turmaService;
    constructor(turmaService: TurmaService);
    create(body: CreateTurmaDto): Promise<{
        data: string;
        turma: CreateTurmaDto;
    }>;
    findAll(): Promise<{
        turmas: unknown;
    }>;
    findOne(id: string): Promise<{
        turma: string | {
            response: unknown;
        };
    }>;
    update(id: string, updateTurmaDto: UpdateTurmaDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        mensagem: string;
    }>;
}
