import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private messageService: MessageService,private routes : Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', [Validators.required]]
  });
  }

  get f() { return this.registerForm.controls; }
  

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.controls)
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log('SUCCESS!! :-)\n\n' + this.registerForm.value);
    this.authService.registerUser(this.registerForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        if(data.success==true){
          this.messageService.add({severity:'success', detail:data.message});
        }else{
          this.messageService.add({severity:'error', detail:data.message});
   
        }

        this.registerForm.reset();
        this.routes.navigate(['login']);
      }
    ),(err)=>{
        console.log("Error While saving");
    }
}
}
