import {Component, OnInit, ViewChild} from '@angular/core';
import {MdlDialogComponent} from 'angular2-mdl';

@Component({
  selector: 'zkn-todos-edit-dialog',
  templateUrl: './todos-edit-dialog.component.html',
  styleUrls: ['./todos-edit-dialog.component.css']
})
export class TodosEditDialogComponent implements OnInit {

  @ViewChild('downloadIconMdlDialog') downloadIconMdlDialog: MdlDialogComponent;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.downloadIconMdlDialog.show();
  }
}
