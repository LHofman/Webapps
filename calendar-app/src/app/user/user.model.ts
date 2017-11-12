export class User {

    private _id: number;
    private _firstname: string;
    private _name: string;

    constructor(id: number, firstname: string, name: string) {
        this._id = id;
        this._firstname = firstname;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    get firstname(): string {
        return this._firstname;
    }

    get name(): string {
        return this._name;
    }

}
