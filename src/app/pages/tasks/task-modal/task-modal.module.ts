import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskModalComponent } from "./task-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [TaskModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [TaskModalComponent]
})
export class TaskModalModule {}
