import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
export declare class ProfessorController {
    private readonly professorService;
    constructor(professorService: ProfessorService);
    create(body: CreateProfessorDto): Promise<{
        dados: {
            professor: unknown;
            endereco: unknown;
            telefone: unknown;
        };
    }>;
    findAll(): Promise<{
        professores: unknown;
    }>;
    findOne(authorization: string): Promise<{
        professor: unknown;
    }>;
    findEmail(email: string): Promise<any>;
    update(id: string, body: UpdateProfessorDto): Promise<{
        mensagem: string;
        id?: undefined;
        dadosInseridos?: undefined;
        telefone?: undefined;
        endereco?: undefined;
    } | {
        mensagem: boolean | {
            mesnsagem: string;
            result: unknown;
        };
        id: string;
        dadosInseridos: {
            nome: string;
            cpf: string;
            data_nascimento: string;
            foto: string;
            email: string;
            senha: string;
            id_genero: number;
        }[];
        telefone: {
            numero: string;
        };
        endereco: {
            numero: string;
            cep: string;
        };
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
