import {Uuid} from "../../Core/Domain/Model/Uuid";
import {User} from "../../Core/Domain/Model/User";
import {UserRepositoryInterface} from "../../Core/Domain/Repository/UserRepositoryInterface";
import {MongoClient} from "mongodb";
import {Password} from "../../Core/Domain/Model/Password";

export class UserRepository implements UserRepositoryInterface {
    private client: MongoClient | undefined;

    private async initClient() {
        await MongoClient.connect('mongodb://root:example@mongo:27017/').then((client) => {
            this.client = client
        })
    }

    async findUser(id: Uuid): Promise<User | null> {
        if (!this.client) {
            await this.initClient()
        }

        let user: User | null = null;

        let query = this.client?.db('users').collection('users').findOne({id: id.uuid})
        if (query) {
            let record = await query;
            user = new User(new Uuid(record.id), record.username, new Password(record.password_hash))
        }

        return user;
    }

    async persist(user: User): Promise<void> {
        if (!this.client) {
            await this.initClient()
        }

        this.client?.db('users').collection('users').insertOne({
            id: user.id.uuid,
            username: user.username,
            password_hash: user.password.password_hash
        })
    }
}