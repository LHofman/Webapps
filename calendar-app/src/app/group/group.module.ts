import { GroupDataService } from './group-data.service';
import { GroupComponent } from './group/group.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
    ],
    declarations: [
        GroupComponent,
    ],
    exports: [
        GroupComponent
    ],
    providers: [GroupDataService]
})
export class GroupModule {}
