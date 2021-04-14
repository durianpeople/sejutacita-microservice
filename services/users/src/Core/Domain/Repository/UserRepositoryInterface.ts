import {Uuid} from "../Model/Uuid";
import {User} from "../Model/User";

export interface UserRepositoryInterface {
    findUser(id: Uuid): User | null;

    persist(user: User): void;
}