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
  
<<<<<<< HEAD
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.checkIfUserIsLogged();
    }
=======
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

>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
    
  

  checkIfUserIsLogged() {
    if (this.usersService.loggedUser()) {
      return true;
    } else {
<<<<<<< HEAD
      // Redirect to login page or any other desired route
=======
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
      this.router.navigate(['/login']);
      return false;
    }
  }
}