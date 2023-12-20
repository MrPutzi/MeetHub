import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { AddEventComponent } from './add-event/add-event.component';

/*
const routes: Routes = [
  { path: 'Login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Dashboard', component:EventsDashboardComponent, pathMatch: 'full'},
  
{ path: 'AddEvent', component:AddEventComponent, pathMatch: 'full'}
];
*/

const routes: Routes = [
  { path: 'Login', component: LoginComponent, pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Dashboard', component: EventsDashboardComponent, pathMatch: 'full'},
  { path: 'AddEvent', component: AddEventComponent, pathMatch: 'full' }
    ]
  

@NgModule({
  declarations: [
    
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
