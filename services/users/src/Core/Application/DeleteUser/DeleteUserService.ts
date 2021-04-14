import {inject, injectable} from "tsyringe";
import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {DeleteUserRequest} from "./DeleteUserRequest";
import {Uuid} from "../../Domain/Model/Uuid";
import {User} from "../../Domain/Model/User";

@injectable()
export class DeleteUserService {
    static USER_NOT_FOUND = 1;

    constructor(@inject('UserRepositoryInterface') private user_repository: UserRepositoryInterface) {
    }

    async execute(request: DeleteUserRequest) {
        let user: User | null = await this.user_repository.findUser(new Uuid(request.id))
        if (!user) {
            throw {
                code: DeleteUserService.USER_NOT_FOUND,
                message: 'User not found'
            }
        }

        await this.user_repository.delete(user);
    }
}