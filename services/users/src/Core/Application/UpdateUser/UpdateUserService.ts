import {inject, injectable} from "tsyringe";
import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {UpdateUserRequest} from "./UpdateUserRequest";
import {User} from "../../Domain/Model/User";
import {Uuid} from "../../Domain/Model/Uuid";
import {Password} from "../../Domain/Model/Password";

@injectable()
export class UpdateUserService {
    static readonly USER_NOT_FOUND = 1;
    static readonly PASSWORD_INCORRECT = 2;

    constructor(@inject('UserRepositoryInterface') private user_repository: UserRepositoryInterface) {
    }

    async execute(request: UpdateUserRequest): Promise<void> {
        let user: User | null = await this.user_repository.findUser(new Uuid(request.id));
        if (!user) {
            throw {
                code: UpdateUserService.USER_NOT_FOUND,
                message: 'User not found'
            }
        }

        user.username = request.username;

        if (request.old_password && request.new_password) {
            if (!user.password.testAgainst(request.old_password)) {
                throw {
                    code: UpdateUserService.PASSWORD_INCORRECT,
                    message: 'Password incorrect'
                }
            }

            user.password = Password.createFromPlain(request.new_password)
        }

        await this.user_repository.persist(user);
    }
}