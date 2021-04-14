import {UserRepositoryInterface} from "../../Domain/Repository/UserRepositoryInterface";
import {CreateUserRequest} from "./CreateUserRequest";
import {User} from "../../Domain/Model/User";

export class CreateUserService {
    private user_repository: UserRepositoryInterface;

    constructor(user_repository: UserRepositoryInterface) {
        this.user_repository = user_repository;
    }

    execute(request: CreateUserRequest) {
        let user: User = User.create(request.username, request.password);
        this.user_repository.persist(user);
    }
}