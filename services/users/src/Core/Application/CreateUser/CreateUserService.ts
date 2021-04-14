import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {CreateUserRequest} from "./CreateUserRequest";
import {User} from "../../Domain/Model/User";
import {inject, injectable} from "tsyringe";

@injectable()
export class CreateUserService {
    private user_repository: UserRepositoryInterface;

    constructor(@inject("UserRepositoryInterface") user_repository: UserRepositoryInterface) {
        this.user_repository = user_repository;
    }

    async execute(request: CreateUserRequest) {
        let user: User = User.create(request.username, request.password);
        await this.user_repository.persist(user);
    }
}