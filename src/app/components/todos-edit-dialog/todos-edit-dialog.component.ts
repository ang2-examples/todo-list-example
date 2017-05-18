import {Component, OnInit, ViewChild} from '@angular/core';
import {MdlDialogComponent} from 'angular2-mdl';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {TodosActions} from '../../store/index.actions';
import {Todo} from '../../models/todos/todo.model';

@Component({
  selector: 'zkn-todos-edit-dialog',
  templateUrl: './todos-edit-dialog.component.html',
  styleUrls: ['./todos-edit-dialog.component.scss']
})
export class TodosEditDialogComponent implements OnInit {

  todo: Todo = this.getNewTodo();
  title: string;
  @ViewChild('editTaskMdlDialog') editTaskMdlDialog: MdlDialogComponent;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  show(todo: Todo) {
    this.todo = todo || this.getNewTodo();
    this.title = this.todo.title;
    this.editTaskMdlDialog.show();
  }

  saveTask() {
    const savedTodo = Object.assign({}, this.todo, { title: this.title });
    this.store.dispatch(new TodosActions.SaveTodoAction(savedTodo));
    this.editTaskMdlDialog.close();
  }

  cancel() {
    this.editTaskMdlDialog.close();
  }

  private getNewTodo(): Todo {
    return {
      title: '',
      priority: 0
    };
  }
}
