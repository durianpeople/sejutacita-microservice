import {Uuid} from "./Uuid";
import {Password} from "./Password";

export class User {
    get password(): Password {
        return this._password;
    }

    set password(value: Password) {
        this._password = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get id(): Uuid {
        return this._id;
    }

    private readonly _id: Uuid;
    private _username: string;
    private _password: Password;

    constructor(id: Uuid, username: string, password: Password) {
        this._id = id;
        this._username = username;
        this._password = password;
    }

    static create(username: string, password: string): User {
        return new User(Uuid.generate(), username, Password.createFromPlain(password));
    }
}