import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PubsubService } from "../../../common/services/pubsub/pubsub.service";
import { TodoService } from "../../../core/services/todo.service";

@Component({
  selector: 'app-task-removal',
  templateUrl: './task-removal.component.html',
  styleUrls: ['./task-removal.component.scss']
})
export class TaskRemovalComponent implements OnInit {
  id: number;
  title: string;

  constructor(
    private pubSubService: PubsubService,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number },
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    // Check notifications for any task selected
    this.pubSubService.get('taskSelected')
        .asObservable() // Desnecessário
        .subscribe(e => {
          if (e !== null) {
            this.id = e.id;
            this.title = e.title;
          }
        });    
  }

  /**
   * Send notification to close modal
   */
  close(): void {
    this.pubSubService.emit('closeModal', true);
  }

  /**
   * Remove a task
   */
  remove(): void {
    this.todoService.removeTask(this.id);
    this.pubSubService.emit('closeModal', true);
  }
}
