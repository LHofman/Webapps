import { RouterModule } from '@angular/router';
import { TaskDataService } from './task-data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TaskPageComponent } from './task-page/task-page.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';

const routes = [
    {path: 'task/:taskId', component: TaskPageComponent}
];

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        TaskComponent,
        AddTaskComponent,
        TaskPageComponent
    ],
    exports: [
        TaskComponent,
        AddTaskComponent,
        TaskPageComponent
    ],
    providers: [TaskDataService]
})
export class TaskModule {}
