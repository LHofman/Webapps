import { TaskDataService } from './task/task-data.service';
import { Observable } from 'rxjs/Rx';
import { Task } from './task/task.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskResolver implements Resolve<Task> {

    constructor(private taskData: TaskDataService) {}

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Task> {
            return this.taskData.getTask(route.params['id']);
        }
}
