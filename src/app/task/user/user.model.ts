export class User {

    public id: number;
    public firstname: string;
    public name: string;
    public username: String;

    static fromJSON(item) {
        return new User(item._id, item.firstname, item.name, item.username);
    }

    constructor(id: number, firstname: string, name: string, username: String) {
        this.id = id;
        this.firstname = firstname;
        this.name = name;
        this.username = username;
    }

    toJSON() {
        return {
            name: this.name,
            firstname: this.firstname,
            username: this.username
        };
    }

}
