import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm = new FormGroup({
    name: new FormControl(''),
    date: new FormControl(''),
    // Add other event properties
  });

  constructor(private EventsService: EventsService) { }

  ngOnInit(): void {
    // Populate the form with the event data when the component is initialized
  }

  onSubmit(): void {
    // Call the service to update the event
    this.EventsService.updateEvent(this.eventForm.value).subscribe();
  }
}