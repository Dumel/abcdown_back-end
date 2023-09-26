import { AuthService } from './auth.service';
import { AuthRequest } from './models/authRequest';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginProfessor(req: AuthRequest): import("./models/userToken").UserToken;
    loginResponsavel(req: AuthRequest): import("./models/userToken").UserToken;
}
