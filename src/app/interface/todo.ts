export interface Todo {
    todo_id: number;
    task: string;
    due_date: string;
    status: 'Pending' | 'Doing' | 'Done';
    priority: boolean;
  }
  