import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './interface/todo';
import { TodoFormComponent } from './component/todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todoList: Todo[] = [];
  status: string = ''
  @ViewChild(TodoFormComponent) FormComponent!: TodoFormComponent;
  constructor( private todoSevice: TodoService ){

  }

  ngOnInit(): void {
      this.getAllTodoList()
  }

  getAllTodoList(status: string= '') {
    this.status = status
    this.todoSevice.getAllTodo(status).subscribe(
      (todos: {
        status: number,
        message: string,
        data: Todo[]
      }) => {
        console.log("todos", todos)
        this.todoList = todos.data;
      },
      (error) => {
        this.todoList = []
        console.error('Error fetching todo list:', error);
      }
    );
  }


  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createTodo() {
    this.getAllTodoList()
    this.closeModal(); // Close modal after creating todo
  }

  editTodo(id: number) {
    this.FormComponent.fillForm(id)
    this.openModal()
  }

  deleteTodo(id: number) {
    this.todoSevice.deleteTodo(id).subscribe((todos: {
      status: number,
      message: string,
      data: Todo[]
    }) => {
      if(todos.status === 200){
        this.getAllTodoList(this.status)
      }
    },
    (error) => {
      console.error('Error fetching todo list:', error);
    }
  )
  }
}
