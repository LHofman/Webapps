export class User {

    private _firstname: string;

    constructor(firstname: string) {
        this._firstname = firstname;
    }

    get firstname(): string {
        return this._firstname;
    }

}
