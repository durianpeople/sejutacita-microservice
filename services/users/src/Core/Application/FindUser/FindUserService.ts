import {FindUserRequest} from "./FindUserRequest";
import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {inject, injectable} from "tsyringe";
import {User} from "../../Domain/Model/User";
import {Uuid} from "../../Domain/Model/Uuid";

@injectable()
export class FindUserService {
    constructor(@inject('UserRepositoryInterface') private user_repository: UserRepositoryInterface) {
    }

    async execute(request: FindUserRequest) {
        let user: User | null = await this.user_repository.findUser(new Uuid(request.id))

        return user ? {
            id: user.id.uuid,
            username: user.username
        } : null
    }
}