export class User {

    public id: number;
    public firstname: string;
    public name: string;

    static fromJSON(item) {
        return new User(item._id, item.firstname, item.name);
    }

    constructor(id: number, firstname: string, name: string) {
        this.id = id;
        this.firstname = firstname;
        this.name = name;
    }

    toJSON() {
        return {
            name: this.name,
            firstname: this.firstname
        };
    }

}
