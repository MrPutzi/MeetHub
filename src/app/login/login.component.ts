import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../entities/auth';
import { UsersService } from '../../services/users.service';
import { DEFAULT_NAVIGATE_AFTER_LOGIN } from '../../services/users.service';
import {MessageService} from "../../services/message.service";
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

  auth: Auth = new Auth('admin', 'admin');
  usersService = inject(UsersService);
  router = inject(Router);
  messageService = inject(MessageService);


  onSubmit() {
    this.usersService.login(this.auth).subscribe({
      next: () => {
        this.router.navigateByUrl(this.usersService.navigateAfterLogin);
      },
      error: (error) => {
        this.messageService.error(error);
      }
    });
  }
}

