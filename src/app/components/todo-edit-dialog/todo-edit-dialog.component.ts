import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Todo} from '../../models/todos/todo.model';
import {TodosActions} from '../../store/index.actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';

@Component({
  selector: 'zkn-todo-edit-dialog',
  templateUrl: './todo-edit-dialog.component.html',
  styleUrls: ['./todo-edit-dialog.component.scss']
})
export class TodoEditDialogComponent implements OnInit {

  todo: Todo;
  constructor(@Inject(MD_DIALOG_DATA) public data: Todo,
              private store: Store<State>,
              private dialogRef: MdDialogRef<TodoEditDialogComponent>) {
    this.todo = Object.assign({}, data || this.emptyTodo);
  }

  ngOnInit() {
  }

  onSave() {
    this.store.dispatch(new TodosActions.SaveTodoAction(this.todo));
    this.dialogRef.close();
  }

  private get emptyTodo(): Todo {
    return{
      title: '',
      priority: 0
    };
  }

}
