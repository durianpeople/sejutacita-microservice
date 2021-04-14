export class FindUserRequest {
    get id(): string {
        return this._id;
    }

    private readonly _id: string;

    constructor(id: string) {
        this._id = id;
    }
}