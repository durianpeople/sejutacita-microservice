import {Uuid} from "../Model/Uuid";
import {User} from "../Model/User";

export interface UserRepositoryInterface {
    findUser(id: Uuid): Promise<User | null>;

    persist(user: User): Promise<void>;

    getAll(): Promise<Array<User>>

    delete(user: User): Promise<void>;
}

