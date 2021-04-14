import bcrypt from "bcrypt";

export class Password {
    get password_hash(): string {
        return this._password_hash;
    }

    private readonly _password_hash: string;

    constructor(password_hash: string) {
        this._password_hash = password_hash;
    }

    static createFromPlain(password: string): Password {
        let password_hash: string = bcrypt.hashSync(password, 10)
        return new Password(password_hash)
    }

    testAgainst(target_password: string): boolean {
        return bcrypt.compareSync(target_password, this._password_hash)
    }
}