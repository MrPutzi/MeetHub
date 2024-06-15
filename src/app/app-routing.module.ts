import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { AddEventComponent } from './add-event/add-event.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { AuthGuard } from './auth.guard';
import { EditEventComponent } from './edit-event/edit-event.component';
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
<<<<<<< HEAD
  { path: '', redirectTo: '/LoggedIn', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
  { path: 'Dashboard', component: EventsDashboardComponent, canActivate: [AuthGuard]  },
  { path: 'AddEvent', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'LoggedIn', component: LoggedInComponent, canActivate: [AuthGuard] }
]
=======
  { path: '', redirectTo: '/Homepage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full'  },
  { path: 'Dashboard', component: EventsDashboardComponent, canActivate: [AuthGuard]  },
  { path: 'AddEvent', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'LoggedIn', component: LoggedInComponent, canActivate: [AuthGuard] },
    { path: 'edit-event/:id', component: EditEventComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'Homepage', component: HomepageComponent}
  ];
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
