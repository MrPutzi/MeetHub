import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  standalone: true,
  imports: [],
  templateUrl: './logged-in.component.html',
  styleUrl: './logged-in.component.css'
})
export class LoggedInComponent {

  constructor(private router: Router) {} // Inject the Router module

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
