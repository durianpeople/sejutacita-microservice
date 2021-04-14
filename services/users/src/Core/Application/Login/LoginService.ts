import {inject, injectable} from "tsyringe";
import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {LoginRequest} from "./LoginRequest";
import {sign} from "jsonwebtoken";
import {User} from "../../Domain/Model/User";

@injectable()
export class LoginService {
    static USER_NOT_FOUND = 1;
    static PASSWORD_INCORRECT = 2;

    constructor(@inject('UserRepositoryInterface') private user_repository: UserRepositoryInterface) {
    }

    async execute(request: LoginRequest) {
        if (request.username === process.env.ADMIN_USERNAME && request.password === process.env.ADMIN_PASSWORD) {
            return sign({
                type: 'admin'
            }, <string>process.env.JWT_SECRET)
        }

        let user: User | null = await this.user_repository.findByUsername(request.username)
        if (!user) {
            throw {
                code: LoginService.USER_NOT_FOUND
            }
        }

        if (!user.password.testAgainst(request.password)) {
            throw {
                code: LoginService.PASSWORD_INCORRECT
            }
        }

        return sign({
            type: 'user',
            id: user.id.uuid,
            username: user.username,
        }, <string>process.env.JWT_SECRET, {expiresIn: '1h'})
    }
}