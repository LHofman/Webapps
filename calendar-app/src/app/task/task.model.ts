import { Comment } from '../comment/comment.model';
import { Group } from '../group/group.model';
import {User} from '../user/user.model';
export class Task {

    private _title: string;
    private _date: Date;
    private _location: string;
    private _users = new Array<User>();
    private _groups = new Array<Group>();
    private _comments = new Array<Comment>();

    constructor(title: string, date: Date, location: string) {
        this._title = title;
        this._date = date;
        this._location = location;
    }

    addUsers(...users) {
        for (const user of users) {
            this._users.push(user);
        }
    }

    addGroups(...groups) {
        for (const group of groups) {
            this._groups.push(group);
        }
    }

    addComments(...comments) {
        for (const comment of comments) {
            this._comments.push(comment);
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

    get location(): string {
        return this._location;
    }

    get groups(): Group[] {
        return this._groups;
    }

    get comments(): Comment[] {
        return this._comments;
    }

}