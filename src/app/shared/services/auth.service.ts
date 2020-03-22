import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { map, catchError,concatMap,flatMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 constructor( private http: HttpClient) { }

  isLoggedIn() {
   return this.http.get("/api/session-check");
    
  }

  login(Logindata){
    return this.http.post("/api/login",Logindata);
  }

  addTask(subUserData){
    return this.http.post("/shop/addTask",subUserData);
  }

  registerUser(userData){
    return this.http.post("/api/register",userData);
  }

  allTasks(data){
    console.log(data);
    return this.http.post("/shop/allTasks",data);
  }
  deleteTask(data){
    return this.http.post("/shop/delete-task",data);
  }
  updateTask(data){ 
    return this.http.post("/shop/update-task",data);
  }

verifyUser(){
  return this.http.get("/api/verify");
}
}
