import { Comment } from '../comment/comment.model';
import { Group } from '../group/group.model';
import {User} from '../user/user.model';
export class Task {

    private _id: number;
    private _title: string;
    private _startTime: Date;
    private _endTime: Date;
    private _location: string;
    private _users = new Array<User>();
    private _groups = new Array<Group>();
    private _comments = new Array<Comment>();

    constructor(id: number, title: string, startTime: Date, endTime: Date, location: string) {
        this._id = id;
        this._title = title;
        this._startTime = startTime;
        this._endTime = endTime;
        this._location = location;
    }

    get id(): number {
        return this._id;
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

    get startTime(): Date {
        return this._startTime;
    }

    get endTime(): Date {
        return this._endTime;
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
