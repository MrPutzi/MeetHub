import {Component, OnInit} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import {Message, MessageService} from "../services/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MeetHub';
  message: Message | null = null;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages().subscribe(msg => {
      this.message = msg;
      setTimeout(() => this.message = null, 3000); // Clear message after 3 seconds
    });
  }
}
