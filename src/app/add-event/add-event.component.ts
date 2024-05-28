import {E} from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Event } from '../../entities/event';
import { EventsService } from '../../services/events.service';
import { Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
submitForm() {
  this.http.post('http://localhost:3000/addevent', this.eventForm.value).subscribe((response) => {
    console.log(response);
  });
}
  eventForm!: FormGroup;
  eventOrganizer: string = this.usersService.getUsersUsername();
  eventAttendees!: string; // Add this line
  eventDate!: Date; // Add this line
  eventDescription!: string; // Add this line
  eventLocation!: string; // Add this line
  eventName!: string; // Add this line
task: any;
editTask: any;


  constructor(private formBuilder: FormBuilder, @Inject(EventsService) private eventsService: EventsService, @Inject(UsersService) private usersService: UsersService, private http: HttpClient) {
    this.eventOrganizer = this.usersService.getUsersUsername();
  }

  @Output() saveEvent = new EventEmitter<Event>();


  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required], // Fix: Convert the string value to a Date object
      location: ['', Validators.required],
      attendees: ['', Validators.required],
    });
  }

  onSubmit() {
    this.saveEvent.emit(this.eventForm.value);
  }

}
