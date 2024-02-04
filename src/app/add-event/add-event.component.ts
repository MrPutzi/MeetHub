import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
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
  }

}
