import { Comment } from '../comment/comment.model';
import {User} from '../user/user.model';
export class Task {

    public id: number;
    public title: string;
    public startTime: Date;
    public endTime: Date;
    public location: string;
    public author: String;
    public users = new Array<User>();
    public comments = new Array<Comment>();

    static fromJSON(item): Task {
        const task = new Task(item._id, item.title, new Date(item.startTime), new Date(item.endTime), item.location, item.author);
        task.comments = item.comments;
        return task;
    }

    constructor(id: number, title: string, startTime: Date, endTime: Date, location: string, author: String) {
        this.id = id;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
        this.author = author;
    }

    toJSON() {
        return {
            title: this.title,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.location,
            author: this.author
        };
    }

}
