import {v4 as generate, validate as isUuidValid} from "uuid";
import assert from "assert";

export class Uuid {
    get uuid(): string {
        return this._uuid;
    }

    private readonly _uuid: string;

    constructor(uuid: string) {
        assert(isUuidValid(uuid), 'Invalid UUID')
        this._uuid = uuid
    }

    static generate(): Uuid {
        return new Uuid(generate())
    }
}