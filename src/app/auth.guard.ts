import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Inject Router so we can hand off the user to the Login Page
  constructor(private usersService: UsersService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log("Auth Guard, url=", state.url);
      if (this.usersService.isLoggedIn()) {
          return true;
        }
        this.router.navigateByUrl('/login');
        return false;
  }

    
  

  checkIfUserIsLogged() {
    if (this.usersService.loggedUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}