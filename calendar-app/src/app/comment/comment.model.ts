import {User} from '../user/user.model';
export class Comment {

    private _author: User;
    private _title: string;
    private _body: string;
    private _comments = new Array<Comment>();

    constructor(author: User, title: string, body: string) {
        this._author = author;
        this._title = title;
        this._body = body;
    }

    get author(): User {
        return this._author;
    }

    get title(): string {
        return this._title;
    }

    get body(): string {
        return this._body;
    }

    get comments(): Comment[] {
        return this._comments;
    }

    addComments(...comments) {
        for (const comment of comments) {
            this._comments.push(comment);
        }
    }

}
