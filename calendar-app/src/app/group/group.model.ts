import {User} from '../user/user.model';
export class Group {

    private _name: string;
    private _users = new Array<User>();

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get users(): User[] {
        return this._users;
    }

    addUsers(...users) {
        for (const user of users) {
            this._users.push(user);
        }
    }

}
