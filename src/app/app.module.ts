import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SweetAlertService } from 'angular-sweetalert-service';

import { AppComponent } from './app.component';
import { ElementAddComponent } from './components/element-add/element-add.component';
import { ElementEditComponent } from './components/element-edit/element-edit.component';
import { ElementComponent } from './components/element/element.component';
import { ElementsListComponent } from './components/elements-list/elements-list.component';
import { ElementShellComponent } from './components/elements/element-shell/element-shell.component';
import { ElementsComponent } from './components/elements/elements.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AppRouting } from './routes/app.routing';
import { AuthService } from './services/auth.service';
import { ElementService } from './services/element.service';
import { ErrorService } from './services/error.service';
import { HttpService } from './services/http.service';
import { LocalStorageService } from './services/local-storage.service';
import { AlertService } from './services/sweet-alert.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchInputComponent,
    ElementsComponent,
    ElementsListComponent,
    ElementComponent,
    ElementAddComponent,
    ElementEditComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ElementShellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    AppRouting
  ],
  providers: [
    AuthService,
    LocalStorageService,
    ElementService,
    HttpService,
    SweetAlertService,
    ErrorService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
