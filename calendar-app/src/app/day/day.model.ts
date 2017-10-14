import {Task} from '../task/task.model';
export class Day {

    private _date: Date;
    private _tasks = new Array<Task>();

    constructor(date: Date) {
        this._date = date;
    }

    get date(): Date {
        return this._date;
    }

    get tasks(): Task[] {
        return this._tasks;
    }

    addTasks(...tasks) {
        for (const task of tasks) {
            this._tasks.push(task);
        }
    }

}
