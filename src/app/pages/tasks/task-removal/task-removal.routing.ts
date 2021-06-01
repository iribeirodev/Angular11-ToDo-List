import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRemovalComponent } from './task-removal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: TaskRemovalComponent}])
  ],
  exports: [RouterModule]
})
export class TaskRemovalRouting { }