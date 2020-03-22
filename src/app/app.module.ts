import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTaskComponent } from './all-task/all-task.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor} from './header.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LeftPanelComponent,
    AddTaskComponent,
    AllTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule
  ],
  
  providers: [AuthService,AuthGuard,ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
