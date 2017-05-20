import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdDialogModule,
  MdToolbarModule,
  MdSidenavModule,
  MdIconModule,
  MdProgressBarModule,
  MdInputModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { reducer } from './store/index.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {fakeBackendProvider} from './shared/helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

// todo: via index
import { TodosComponent } from './components/todos/todos.component';
// todo: via index
import {TodosApiService} from './services/todos-api.service';

// effects
import {TodosEffects} from './store/todos/todos.effects';

import { TodosSidenavComponent } from './components/todos-sidenav/todos-sidenav.component';

import {MdlModule} from 'angular2-mdl';
import {MdlSelectModule} from '@angular2-mdl-ext/select';
import {MdlPopoverModule} from '@angular2-mdl-ext/popover';
import { TodoEditDialogComponent } from './components/todo-edit-dialog/todo-edit-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodosSidenavComponent,
    TodoEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    MdlModule,
    MdlSelectModule.forRoot(),
    MdlPopoverModule.forRoot(),

    BrowserAnimationsModule,

    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdProgressBarModule,
    MdInputModule,

    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    EffectsModule.run(TodosEffects)
  ],
  providers: [
    TodosApiService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  entryComponents: [ TodoEditDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
