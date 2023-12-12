import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../entities/auth';
import { UsersService } from '../../services/users.service';
import { DEFAULT_NAVIGATE_AFTER_LOGIN } from '../../services/users.service';
/*
import { Auth } from "../src/entities/auth"
import { DEFAULT_NAVIGATE_AFTER_LOGIN, UsersService } from 'src/services/users.service';
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  auth: Auth = new Auth('Peter','sovy');
  usersService = inject(UsersService);
  router = inject(Router);

  onSubmit() {
    console.log("Submit");
    console.log(this.auth);
    this.usersService.login(this.auth).subscribe(
      success => {
        if (success) {
          // presmeruj sa na privatnu zonu
          this.router.navigateByUrl(this.usersService.navigateAfterLogin);
          this.usersService.navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;
        } 
      }
    )
  }
}
