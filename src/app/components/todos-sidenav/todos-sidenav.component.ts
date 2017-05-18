import {Component, OnInit, ViewChild} from '@angular/core';
import {TodosEditDialogComponent} from '../todos-edit-dialog/todos-edit-dialog.component';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'zkn-todos-sidenav',
  templateUrl: './todos-sidenav.component.html',
  styleUrls: ['./todos-sidenav.component.scss']
})
export class TodosSidenavComponent implements OnInit {

  todoSearchForm: FormGroup = null;
  @ViewChild('addTodoDialog') addTodoDialog: TodosEditDialogComponent;

  constructor(private formBuilder: FormBuilder) {
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
        alert(form);
      });
  }

  OnCreateTask(): void {
    this.addTodoDialog.show(null);
  }
}
