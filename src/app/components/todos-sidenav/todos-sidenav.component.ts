import {Component, OnInit, ViewChild} from '@angular/core';
import {TodosEditDialogComponent} from '../todos-edit-dialog/todos-edit-dialog.component';

@Component({
  selector: 'zkn-todos-sidenav',
  templateUrl: './todos-sidenav.component.html',
  styleUrls: ['./todos-sidenav.component.css']
})
export class TodosSidenavComponent implements OnInit {

  @ViewChild('editTodoDialog') editTodoDialog: TodosEditDialogComponent;

  constructor() {

  }

  ngOnInit() {
  }

  OnCreateTask(): void {
    this.editTodoDialog.show();
  }
}
