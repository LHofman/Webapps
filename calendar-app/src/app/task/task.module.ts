import { RouterModule } from '@angular/router';
import { TaskDataService } from './task-data.service';
import { TaskResolver } from './task.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TaskPageComponent } from './task-page/task-page.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';

const routes = [
    {path: ':taskId', component: TaskPageComponent,
        resolve: { task: TaskResolver}}
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
    providers: [
        TaskDataService,
        TaskResolver
    ]
})
export class TaskModule {}
