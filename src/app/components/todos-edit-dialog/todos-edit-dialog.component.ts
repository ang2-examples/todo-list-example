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

  todo: Todo = { title: '' };
  @ViewChild('editTaskMdlDialog') editTaskMdlDialog: MdlDialogComponent;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  show(todo: Todo) {
    this.todo = todo || { title: '' };

    this.editTaskMdlDialog.show();
  }

  saveTask() {
    this.store.dispatch(new TodosActions.SaveTodoAction(this.todo));
    this.editTaskMdlDialog.close();
  }

  cancel() {
    this.editTaskMdlDialog.close();
  }
}
