import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Auth } from '../entities/auth';
import { AuthGuard } from './auth.guard';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import {HomepageComponent} from "./homepage/homepage.component";
import {MessagingComponent} from "./messaging/messaging.component";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AddEventComponent,
    EditEventComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        NgbModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        EventsDashboardComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HomepageComponent,
        MessagingComponent,
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

