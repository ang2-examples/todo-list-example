import {Component, OnInit, ViewChild} from '@angular/core';
import {MdlDialogComponent} from 'angular2-mdl';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {TodosActions} from '../../store/index.actions';
import {Todo} from '../../models/todos/todo.model';

@Component({
  selector: 'zkn-todos-edit-dialog',
  templateUrl: './todos-edit-dialog.component.html',
  styleUrls: ['./todos-edit-dialog.component.css']
})
export class TodosEditDialogComponent implements OnInit {

  taskname: string;
  @ViewChild('editTaskMdlDialog') editTaskMdlDialog: MdlDialogComponent;

  constructor(private store: Store<State>) { }

  ngOnInit() {
  }

  show() {
    this.editTaskMdlDialog.show();
  }

  saveTask() {
    const todo: Todo =  {
      title: this.taskname
    };
    this.store.dispatch(new TodosActions.AddTodoAction(todo));
    this.editTaskMdlDialog.close();
  }

  cancel() {
    this.editTaskMdlDialog.close();
  }
}
