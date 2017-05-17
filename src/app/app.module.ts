import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {MaterialModule} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { reducer } from './store/index.reducer';

import {fakeBackendProvider} from './shared/helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { TodosComponent } from './components/todos/todos.component';



@NgModule({
  declarations: [
    AppComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    MaterialModule,

    StoreModule.provideStore(reducer)
  ],
  providers: [
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
