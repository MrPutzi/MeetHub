<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
import {E} from '@angular/cdk/keycodes';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
import { Event } from '../../entities/event';
import { EventsService } from '../../services/events.service';
import { Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
=======
import {Router} from "@angular/router";
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
<<<<<<< HEAD
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;
  eventOrganizer: string = this.usersService.getUsersUsername();
  eventCategory!: string; // Add this line
  eventAttendees!: string; // Add this line
  eventDate!: Date; // Add this line
  eventDescription!: string; // Add this line
  eventLocation!: string; // Add this line
  eventName!: string; // Add this line


  constructor(private formBuilder: FormBuilder, @Inject(EventsService) private eventsService: EventsService, @Inject(UsersService) private usersService: UsersService, private http: HttpClient) {
    this.eventOrganizer = this.usersService.getUsersUsername();
  }



  ngOnInit() {
    this.eventForm = this.formBuilder.group({
=======
export class AddEventComponent {
  addEventForm: FormGroup;

  constructor(
    private eventsService: EventsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addEventForm = this.fb.group({
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
<<<<<<< HEAD
      attendees: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(eventForm: NgForm) {
    const formData = eventForm.value;
    this.http.post('http://localhost:3000/addevent', formData).subscribe(response => {
      console.log(response);
    }, error => {
    });
=======
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      this.eventsService.addEvent(this.addEventForm.value).subscribe(() => {
        this.router.navigate(['/Dashboard']);
      });
    }
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
  }
}
