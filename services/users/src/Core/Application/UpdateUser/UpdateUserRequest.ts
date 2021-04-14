export class UpdateUserRequest {
    readonly id: string;
    readonly username: string;
    readonly old_password: string | null;
    readonly new_password: string | null;

    constructor(id: string, username: string, old_password: string | null, new_password: string | null) {
        this.id = id;
        this.username = username;
        this.old_password = old_password;
        this.new_password = new_password;
    }
}