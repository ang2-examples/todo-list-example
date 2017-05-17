import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosSidenavComponent } from './todos-sidenav.component';

describe('TodosSidenavComponent', () => {
  let component: TodosSidenavComponent;
  let fixture: ComponentFixture<TodosSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
