import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  username = '';
  constructor(private usersService: UsersService, private router: Router){}

  ngOnInit(): void {
   this.usersService.loggedUser().subscribe(username => {
    this.username = username;
   });
  }

  logout() {
    this.usersService.logout();
    this.router.navigateByUrl('/');
  }

  protected readonly Animation = Animation;
}

