import { ResponsavelService } from './responsavel.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
export declare class ResponsavelController {
    private readonly responsavelService;
    constructor(responsavelService: ResponsavelService);
    create(body: CreateResponsavelDto): Promise<{
        dados: {
            responsavel: unknown;
            endereco: unknown;
        };
    }>;
    findAll(): Promise<{
        responsaveis: unknown;
    }>;
    findOne(id: string): Promise<{
        responsavel: unknown;
    }>;
    update(id: string, body: UpdateResponsavelDto): Promise<{
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
