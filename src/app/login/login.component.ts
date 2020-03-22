import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginError:'';

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private routes : Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
  });
  }

  get f() { return this.loginForm.controls; }
  

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.controls)
    if (this.loginForm.invalid) {
        return;
    }
    console.log('SUCCESSAAAAA!! :-)\n\n' + this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.success==true){
          this.loginError='';
          localStorage.setItem("sessionKey",data.token);
          this.routes.navigate(['add-task']);
        }else{
          this.loginError=data.message;
        } 
      }
    ),(err)=>{
        console.log("Error While Login");
    }
}
}
