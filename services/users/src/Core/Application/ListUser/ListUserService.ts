import {inject, injectable} from "tsyringe";
import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {User} from "../../Domain/Model/User";

@injectable()
export class ListUserService {
    constructor(@inject('UserRepositoryInterface') private user_repository: UserRepositoryInterface) {
    }

    async execute() {
        let users: User[] = await this.user_repository.getAll()

        return users.map((user: User) => {
            return {
                id: user.id.uuid,
                username: user.username
            }
        })
    }
}