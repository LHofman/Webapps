import {User} from '../user/user.model';
export class Task {

    private _title: string;
    private _date: Date;
    private _users = new Array<User>();

    constructor(title: string, date: Date) {
        this._title = title;
        this._date = date;
    }

    addUsers(...users) {
        for (const user of users) {
            this._users.push(user);
        }
    }

    get title(): string {
        return this._title;
    }

    get users(): User[] {
        return this._users;
    }

    get date(): Date {
        return this._date;
    }

}
