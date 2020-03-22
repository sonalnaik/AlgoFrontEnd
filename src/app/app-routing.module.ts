import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AllTaskComponent } from './all-task/all-task.component';
import { AuthGuard } from './auth.guard';
const routes:Routes=[
  { path: '', redirectTo: '/add-task', pathMatch: 'full'}, 
  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'dashboard', component:AddTaskComponent, canActivate: [AuthGuard]},
  { path:'add-task', component:AddTaskComponent, canActivate: [AuthGuard]},
  { path:'all-tasks', component:AllTaskComponent,canActivate: [AuthGuard]},
  
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
