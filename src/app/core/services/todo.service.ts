import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDo } from "../models/todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private baseURL: string = "https://6078ed5ae7f4f50017184e92.mockapi.io/api/v1/todo";

  constructor(private http: HttpClient) {}

  /**
   * Get all tasks
   * @returns Observable of tasks
   */
  getAllTasks(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.baseURL);
  }

  /**
   * Save a task
   * @param todo task to be persisted
   * @param isNewTask post if it is a new task, otherwise put.
   */
  saveTask(todo: ToDo, isNewTask: boolean = true) {
    const options = {
      headers: new HttpHeaders().append("Content-Type", "application/x-www-form-urlencoded")
    };

    let body = `title=${todo.title}&content=${todo.content}`;
    
    if (isNewTask) {
      this.http.post(this.baseURL, body, options).subscribe(e => {
        //console.log('retorno post', e);
      })
    }
    else {
      this.http.put(this.baseURL + '/' + todo.id, body, options).subscribe(e => {
        //console.log('retorno put', e);
      });
    }
  }

  /**
   * Remove a task by id
   * @param id Task id
   */
  removeTask(id: number): void {
    this.http.delete(this.baseURL + '/' + id).subscribe(e => {
      //console.log('retorno delete', e);
    })
  }

}
