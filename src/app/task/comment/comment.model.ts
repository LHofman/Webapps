import {User} from '../user/user.model';
export class Comment {

    private _id: Number;
    private _author: User;
    private _title: string;
    private _body: string;
    private _comments = new Array<Comment>();

    constructor(id: Number, author: User, title: string, body: string, comments?: Comment[]) {
        this._id = id;
        this._author = author;
        this._title = title;
        this._body = body;
    }

    static fromJSON(item) {
        return new Comment(item._id, item.author, item.title, item.body, item.comments);
    }

    get id(): Number {
        return this._id;
    }

    set id(id: Number) {
        this._id = id;
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

    toJSON() {
        return {
            author: this.author,
            title: this.title,
            body: this.body
        };
    }

}
