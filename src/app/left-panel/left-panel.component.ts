import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class LeftPanelComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService,private routes : Router) { }

  ngOnInit() {
  }

  logout(){
   
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Logout?',
      accept: () => {
          //Actual logic to perform a confirmation
          localStorage.removeItem("sessionKey");
          this.routes.navigate(['login']);
      
      }
  });
  }
}
