import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { of } from 'rxjs';
import { map, catchError,concatMap,flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private routes : Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  this.isSessionAlive();
  }
  
  isSessionAlive(): Observable<boolean> {
    console.log("checking authentication");
    return this.authService.isLoggedIn().pipe(
      map((response :any) => {
        if (response.message.includes("Token valid")) {
          return true;
        } else {
          this.routes.navigate(['login']);
          return false;
        } 
      }),
      
      catchError((error) => {
         this.routes.navigate(['login']);
         return of(error);
      })
    )
  
  }
}
