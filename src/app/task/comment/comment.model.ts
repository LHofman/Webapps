import {User} from '../user/user.model';
export class Comment {

    private _id: Number;
    private _author: String;
    private _title: string;
    private _body: string;

    constructor(id: Number, author: String, title: string, body: string) {
        this._id = id;
        this._author = author;
        this._title = title;
        this._body = body;
    }

    static fromJSON(item) {
        return new Comment(item._id, item.author, item.title, item.body);
    }

    get id(): Number {
        return this._id;
    }

    set id(id: Number) {
        this._id = id;
    }

    get author(): String {
        return this._author;
    }

    get title(): string {
        return this._title;
    }

    get body(): string {
        return this._body;
    }

    toJSON() {
        return {
            author: this.author,
            title: this.title,
            body: this.body
        };
    }

}
