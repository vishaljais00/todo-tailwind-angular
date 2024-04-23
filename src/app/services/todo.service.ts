import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todo'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createTodo(todoData: Todo): Observable<any> {
    return this.http.post(`${this.apiUrl}`, todoData);
  }

  getAllTodo(status: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}?status=${status}`)
  }

  getOneTodo(todoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${todoId}`);
  }

  updateTodo(todoData: Todo): Observable<any> {
    return this.http.put(`${this.apiUrl}`, todoData);
  }

  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${todoId}`,);
  }
}
