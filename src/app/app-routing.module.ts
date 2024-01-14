import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { AddEventComponent } from './add-event/add-event.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: EventsDashboardComponent },
  { path: 'addEvent', component: AddEventComponent },
  { path: 'loggedIn', component: LoggedInComponent, canActivate: [AuthGuard] }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }