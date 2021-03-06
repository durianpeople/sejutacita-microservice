import {Uuid} from "../../Core/Domain/Model/Uuid";
import {User} from "../../Core/Domain/Model/User";
import {UserRepositoryInterface} from "../../Core/Domain/Repository/UserRepositoryInterface";
import {MongoClient} from "mongodb";
import {Password} from "../../Core/Domain/Model/Password";

export class UserRepository implements UserRepositoryInterface {
    async findByUsername(username: string): Promise<User | null> {
        if (!this.client) {
            await this.initClient()
        }

        let user: User | null = null;

        let query = this.client?.db('users').collection('users').findOne({username: username})
        if (query) {
            let record = await query;
            if (!record)
                return null;
            user = new User(new Uuid(record.id), record.username, new Password(record.password_hash))
        }

        return user;
    }
    async delete(user: User): Promise<void> {
        if (!this.client) {
            await this.initClient()
        }

        this.client?.db().collection('users').deleteMany({id: user.id.uuid}, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("deleted?")
            }
        })
    }

    async getAll(): Promise<Array<User>> {
        if (!this.client) {
            await this.initClient()
        }

        let query = this.client?.db('users').collection('users').find()
        if (query) {
            let records = await query;
            return records.map(function (record) {
                return new User(new Uuid(record.id), record.username, new Password(record.password_hash))
            }).toArray()
        }
        return [];
    }

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
            if (!record)
                return null;
            user = new User(new Uuid(record.id), record.username, new Password(record.password_hash))
        }

        return user;
    }

    async persist(user: User): Promise<void> {
        if (!this.client) {
            await this.initClient()
        }

        this.client?.db('users').collection('users').replaceOne({id: user.id.uuid}, {
            id: user.id.uuid,
            username: user.username,
            password_hash: user.password.password_hash
        }, {upsert: true})
    }
}