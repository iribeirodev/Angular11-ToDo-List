import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDashboardComponent } from './task-dashboard.component';
import { TaskDashboardRouting } from './task-dashboard.routing';
import { TaskListModule } from '../task-list/task-list.module';
import { TaskToolbarModule } from '../task-toolbar/task-toolbar.module';
import { TaskModalModule } from '../task-modal/task-modal.module';

@NgModule({
  declarations: [TaskDashboardComponent],
  imports: [
    CommonModule,
    TaskListModule,
    TaskModalModule,
    TaskToolbarModule,
    TaskDashboardRouting
  ]
})
export class TaskDashboardModule { }
