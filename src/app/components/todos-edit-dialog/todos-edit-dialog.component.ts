import {Component, OnInit, ViewChild} from '@angular/core';
import {MdlDialogComponent} from 'angular2-mdl';

@Component({
  selector: 'zkn-todos-edit-dialog',
  templateUrl: './todos-edit-dialog.component.html',
  styleUrls: ['./todos-edit-dialog.component.css']
})
export class TodosEditDialogComponent implements OnInit {

  taskname: string;
  @ViewChild('editTaskMdlDialog') editTaskMdlDialog: MdlDialogComponent;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.editTaskMdlDialog.show();
  }

  saveTask() {
    alert('save');
  }

  cancel() {
    this.editTaskMdlDialog.close();
  }
}
