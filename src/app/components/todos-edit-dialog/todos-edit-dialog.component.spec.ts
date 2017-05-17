import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosEditDialogComponent } from './todos-edit-dialog.component';

describe('TodosEditDialogComponent', () => {
  let component: TodosEditDialogComponent;
  let fixture: ComponentFixture<TodosEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
