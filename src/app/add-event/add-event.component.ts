import {E} from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Event } from '../../entities/event';
import { EventsService } from '../../services/events.service';
import { Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Observer, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { MessageService } from '../../services/message.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  addEventForm: FormGroup;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      this.eventsService.addEvent(this.addEventForm.value).pipe(
        catchError(error => this.errorHandling(error))
      ).subscribe(() => {
        this.router.navigate(['/Dashboard']);
      });
    }
  }

  errorHandling(httpError: any): Observable<never> {
    if (httpError.status === 0) {
      this.messageService.error("Network error: Please check your internet connection.");
    } else if (httpError.status >= 400 && httpError.status < 500) {
      this.messageService.error("Client error: Please check the data you have entered.");
    } else if (httpError.status >= 500) {
      this.messageService.error("Server error: Please try again later.");
    } else {
      this.messageService.error("An unexpected error occurred. Please try again");
    }
    console.error(httpError);
    return throwError(httpError);
  }
}
