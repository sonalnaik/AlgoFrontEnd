import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-all-shops',
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class AllTaskComponent implements OnInit {
  cols: any[];
  shops:any;
  display: boolean = false;
  row:any;
  displayTask: boolean = false;
  titleFormGroup: FormGroup;
  addShopForm: FormGroup;
  TaskForm: FormGroup;
  submitted = false;
  id:any;
  
  constructor(private messageService: MessageService,private formBuilder: FormBuilder,private authService: AuthService,private routes : Router,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getShopList();
    this.cols = [

      { field: 'name', header: 'Task Name', width: '25%' },
      { field: 'description', header: 'Description',width: '50%' },
      { field: 'created', header: 'Created Date',width: '25%' },
     
  ];
  this.TaskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', [Validators.required]]
});
  }
  get f() { return this.TaskForm.controls; }

  getShopList(){
    this.authService.verifyUser().subscribe((data)=>{
      let userdetail:any=data
      this.authService.allTasks(userdetail).subscribe(
        (data:any)=>{
          console.log(data);
          if(data.success==true){
            this.shops=data.data;
          }
        }
      ),(err)=>{
          console.log("Error While fetching");
      }
    }),(err)=>{
      console.log("Error While getting user details");
  }
    
  }

  showDetail(rowData){
    console.log(rowData);
    this.display = true;
    this.row=rowData;
    console.log(this.row);
    
  }

  addTask(){
    console.log('clicked');
    this.routes.navigate(['add-task']);
  }

  varifyUser(){
    this.authService.verifyUser().subscribe((data)=>{
      console.log(data);
    })
      
  }
  deleteTask(rowdata){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this task?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.authService.deleteTask(rowdata).subscribe(
            (data:any)=>{
              console.log(data);
              if(data.success==true){
                this.messageService.add({severity:'success', detail:"Task deleted sucessfully"});
                this.getShopList()
              }else{
                this.messageService.add({severity:'error', detail:"Error while deleting task"});
              }
            
            }
          ),(err)=>{
              console.log("Error While deleting");
          }
      }
  });
  }
  showTaskDialog(rowdata) {
    console.log(rowdata)
    this.displayTask = true;
    this.TaskForm.controls['name'].setValue(rowdata.name);
    this.TaskForm.controls['description'].setValue(rowdata.description);
    this.id=rowdata._id;

}

onSubmit() {
  this.submitted = true;
  console.log(this.TaskForm.controls)
  // stop here if form is invalid
  if (this.TaskForm.invalid) {
      return;
  }
  let formData:any=[];
  formData.push({"id":this.id,"name":this.TaskForm.value.name,"description":this.TaskForm.value.description});
  
  console.log('SUCCESS!! :-)\n\n' + this.TaskForm.value.name+this.TaskForm.value.description);
  this.authService.updateTask(formData[0]).subscribe(
    (data:any)=>{
      console.log(data);
      if(data.success==true){
        this.messageService.add({severity:'success', detail:"Updated data successfully"});
      
      }else{
        this.messageService.add({severity:'error', detail:"Error while updating"});
      }
      this.TaskForm.reset();
      this.displayTask=false;
      this.getShopList();

    }
  ),(err)=>{
      console.log("Error While saving");
  }
}

}
