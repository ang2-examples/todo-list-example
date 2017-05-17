import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../store/index.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'zkn-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todosList$: Observable<any>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.todosList$ = this.store.select(state => state.todos.todoList);
  }

}
