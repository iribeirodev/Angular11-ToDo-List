import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Sort } from "@angular/material/sort";
import { PubsubService } from "../../../common/services/pubsub/pubsub.service";
import { ToDo } from "../../../core/models/todo";
import { TodoService } from "../../../core/services/todo.service";
import { TaskModalComponent } from "../task-modal/task-modal.component";
import { TaskRemovalComponent } from "../task-removal/task-removal.component";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
})
export class TaskListComponent implements OnInit {
  todos: ToDo[];
  displayedColumns = ["title", "createdAt", "actions"];
  dialogRef;

  dataSource: ToDo[];

  constructor(
    private todoService: TodoService,
    private pubSubService: PubsubService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.notifyFilter();
    this.refresh();
  }

  /**
   * Sort on click table header
   * @param sort sort parameters
   */
  sortData(sort: Sort) {
    const data = this.todos.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        default: return 0;
      }
    });
  }

  /**
   * Check if a filter criteria has been sent
   */
  notifyFilter(): void {
    this.pubSubService.get('taskFiltered')
        .asObservable()
        .subscribe(e => {
            this.dataSource = this.todos;
            if (e !== null) {
              this.dataSource = this.dataSource.filter((t) => {
                return t.title.toLowerCase() 
                        .startsWith(e.toLowerCase());
              });
            }
        });    
  }

  /**
   * Return task data from service and refresh table data
   */
  refresh(): void {
    this.todoService.getAllTasks().subscribe((todos) => {
      this.todos = todos;
      this.dataSource = this.todos.slice();
    });
  }

  /**
   * Open modal dialog for editing a task
   */
  openDialog(title: string): void {
    this.dialogRef = this.dialog.open(TaskModalComponent, {
      data: { dialogTitle: title}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });
  }  

  /**
   * Open modal dialog for removing a task
   */
  openRemovalDialog(): void {
    this.dialogRef = this.dialog.open(TaskRemovalComponent, {
      data: []
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.refresh();
    });    
  }

  /**
   * Editing task when edit button is clicked
   * @param row current table row
   */
  editClicked(row) {
    this.pubSubService.emit("taskSelected", row);
    this.pubSubService.get('closeModal').asObservable()
        .subscribe(e => {
          if (e !== null) {
            this.dialogRef.close();
            this.refresh();
          }
        });
    this.openDialog('Edit Task');
  }

  /**
   * Removing task when remove button is clicked
   * @param row current table row
   */
  removeClicked(row) {
    this.pubSubService.emit("taskSelected", row);
    this.openRemovalDialog();
  }
}

/**
 * Sort comparable function
 */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  if (typeof a === 'string') a = a.toLowerCase();
  if (typeof b === 'string') b = b.toLowerCase();
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
