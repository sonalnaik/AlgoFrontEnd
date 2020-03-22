import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-sub-user',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[MessageService]
})
export class AddTaskComponent implements OnInit {

  addSubUserForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private messageService: MessageService) { }

  ngOnInit() {
    this.addSubUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]]
  });
  }

  get f() { return this.addSubUserForm.controls; }
  

  onSubmit() {
    this.submitted = true;
    console.log(this.addSubUserForm.controls)
    // stop here if form is invalid
    if (this.addSubUserForm.invalid) {
        return;
    }

     this.authService.verifyUser().subscribe((userdata)=>{
      let userdetail:any=userdata;let formData:any=[]

      formData.push({"user_id":userdetail['data']['id'],"name":this.addSubUserForm.value.name,"description":this.addSubUserForm.value.description});
      console.log("add task",formData)
      this.authService.addTask(formData[0]).subscribe(
        (data:any)=>{
          console.log(data);
          if(data.success==true){
            this.messageService.add({severity:'success', detail:data.message});
          
          }else{
            this.messageService.add({severity:'error', detail:data.message});
          }
          this.addSubUserForm.reset();
        }
      ),(err)=>{
          console.log("Error While saving");
      }
    
    })
    
}
}
