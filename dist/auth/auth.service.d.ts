import { ProfessorService } from 'src/professor/professor.service';
import { ResponsavelService } from 'src/responsavel/responsavel.service';
import { JwtService } from '@nestjs/jwt';
import { Professor } from 'src/professor/entities/professor.entity';
import { Responsavel } from 'src/responsavel/entities/responsavel.entity';
import { UserToken } from './models/userToken';
export declare class AuthService {
    private readonly professorService;
    private readonly responsavelService;
    private readonly jwtService;
    constructor(professorService: ProfessorService, responsavelService: ResponsavelService, jwtService: JwtService);
    validateUser(email: string, password: string, userType: 'professor' | 'responsavel'): Promise<Professor | Responsavel>;
    loginProfessor(user: any): UserToken;
    loginResponsavel(user: any): UserToken;
}
