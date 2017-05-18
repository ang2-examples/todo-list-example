import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {MaterialModule, MdDialogModule} from '@angular/material';

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
import { TodosEditDialogComponent } from './components/todos-edit-dialog/todos-edit-dialog.component';

import {MdlModule} from 'angular2-mdl';
import {MdlSelectModule} from '@angular2-mdl-ext/select';
import {MdlPopoverModule} from '@angular2-mdl-ext/popover';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodosSidenavComponent,
    TodosEditDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    MdlModule,
    MdlSelectModule.forRoot(),
    MdlPopoverModule.forRoot(),

    MaterialModule.forRoot(),

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
  entryComponents: [ TodosEditDialogComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
