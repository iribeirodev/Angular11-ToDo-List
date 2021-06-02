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
      switch (sort.active) { // Poderia ter feito um IF/ELSE ao invés de um switch, visto que é uma prop apenas.
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
        .asObservable() // Não precisava desse asObservable
        .subscribe(e => {
            this.dataSource = this.todos;
            if (e !== null) {
              this.dataSource = this.dataSource.filter((t) => {
                return t.title.toLowerCase() // Poderia criar um StringUtils com essas funções de checagem
                        .startsWith(e.toLowerCase()); // Não use busca apenas pelo começo da string, mas por substrings (indexOf("filter") >= 0)
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
      this.dataSource = this.todos.slice(); // Pq esse slice? Se era pra diferenciar arrays, no pior caso poderia fazer [...(this.todos = todos)] ou [...this.todos]
    });
  }

  /**
   * Open modal dialog for editing a task
   */
  openDialog(title: string): void {
    this.dialogRef = this.dialog.open(TaskModalComponent, {
      data: { dialogTitle: title} // Poderia ter um espaço entre "title}" (lint pegaria isso)
    });

    this.dialogRef.afterClosed().subscribe(result => { // Result não é utilizado.
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

    this.dialogRef.afterClosed().subscribe(result => { // Result não é utilizado.
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
          if (e !== null) { // Poderia ter um pipe filtrando para pegar eventos que não fossem nulos
            this.dialogRef.close();
            this.refresh(); // Não está funcionando
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
    this.openRemovalDialog(); // Deveria subscrever o retorno para atualizar a lista.
  }
}

/**
 * Sort comparable function
 * Faltou declaração dos Parametros e retorno
 */
function compare(a: number | string, b: number | string, isAsc: boolean) { //Não declarou o tipo de retorno
  // Esse compare poderia estar numa classe utilitária para que pudesse ser reutilizado
  if (typeof a === 'string') a = a.toLowerCase();
  if (typeof b === 'string') b = b.toLowerCase();
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1); // Entendo que faz o trabalho, mas não ficou muito clara essa linha. Carecia, de repente, um comentário.
}
