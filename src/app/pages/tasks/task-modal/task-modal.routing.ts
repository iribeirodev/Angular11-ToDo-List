import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskModalComponent } from './task-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: TaskModalComponent}])
  ],
  exports: [RouterModule]
})
export class TaskModalRouting { }