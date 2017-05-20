import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TodosActions} from '../../store/index.actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {MdDialog} from '@angular/material';
import {TodoEditDialogComponent} from '../todo-edit-dialog/todo-edit-dialog.component';

@Component({
  selector: 'zkn-todos-sidenav',
  templateUrl: './todos-sidenav.component.html',
  styleUrls: ['./todos-sidenav.component.scss']
})
export class TodosSidenavComponent implements OnInit {

  todoSearchForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private store: Store<State>,
              private dialog: MdDialog) {
  }

  ngOnInit() {
    const formData: any = {
      filterByTodo: false,
      filterByCancel: false,
      filterByDone: false
    };

    this.todoSearchForm = this.formBuilder.group(formData);

    this.todoSearchForm.valueChanges
      .debounceTime(500)
      .subscribe((form: any) => {
        this.store.dispatch(new TodosActions.SetFiltersAction(form));
        this.store.dispatch(new TodosActions.GetTodosAction());
      });
  }

  OnCreateTask(): void {
    this.dialog.open(TodoEditDialogComponent);
  }
}
