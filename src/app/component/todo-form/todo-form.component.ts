import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/interface/todo';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  todoForm!: FormGroup;
  mode: string =  'Add';
  formError: boolean = false ;
  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      todo_id: new FormControl(''),
      task: new FormControl('', [Validators.required]),
      status: new FormControl('Pending', [Validators.required]),
      due_date: new FormControl(this.getCurrentDate(), [Validators.required]),
      priority: new FormControl(false, [Validators.required]),
    });
  }

  handleSubmit(){
    if(this.todoForm.invalid) {
      this.formError = true
    } else{
      this.formError = false
      if(this.mode == 'Add'){
        this.todoService.createTodo(this.todoForm.value).subscribe((todos: {
          status: number,
          message: string,
        }) => {
         
          this.resetForm()
          this.createTodo()
        },
        (error) => {
          console.error('Error fetching todo list:', error);
        })
      }else{
        this.todoService.updateTodo(this.todoForm.value).subscribe((todos: {
          status: number,
          message: string,
        }) => {
        
          this.resetForm()
          this.createTodo()
        },
        (error) => {
          console.error('Error fetching todo list:', error);
        })
      }
    }
    
  }

  @Input() modalOpen: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() createTodoEvent = new EventEmitter<void>();

  closeModal() {
    this.resetForm()
    this.closeModalEvent.emit();
  }

  fillForm(id: number){
    this.todoService.getOneTodo(id).subscribe((todos: {
      status: number,
      message: string,
      data: Todo
    }) => {
      this.mode = 'edit'
      this.todoForm.patchValue({...todos.data , due_date: todos.data.due_date.split('T')[0]});
    },
    (error) => {
      console.error('Error fetching todo list:', error);
    })
  }

  createTodo() {
    this.createTodoEvent.emit();
  }

    // Function to get the current date----------------
    getCurrentDate(): string {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    resetForm(){
      this.mode = 'Add'
      this.todoForm.reset({
        todo_id: '',
        task: '',
        due_date: this.getCurrentDate(),
        priority: false,
        status: 'Pending'
      })
    }

}
