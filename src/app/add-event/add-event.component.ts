import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../entities/event'; // Correct the module path
import { EventsService } from '../../services/events.service'; // Correct the module path
import { Inject } from '@angular/core'; // Add this import
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  eventtForm!: FormGroup; // Change variable name to eventtForm

  constructor(private formBuilder: FormBuilder, @Inject(EventsService) private eventsService: EventsService) { } // Add @Inject decorator

  ngOnInit() {
    this.eventtForm = this.formBuilder.group({ // Change variable name to eventtForm
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      attendees: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.eventtForm.valid) { // Change variable name to eventtForm
      const event: Event = {
        name: this.eventtForm.get('name')?.value, // Change variable name to eventtForm
        description: this.eventtForm.get('description')?.value, // Change variable name to eventtForm
        date: this.eventtForm.get('date')?.value, // Change variable name to eventtForm
        location: this.eventtForm.get('location')?.value,
        id: 0,
        attendees: []
      };

      this.eventsService.addEvent(event).subscribe((event: Event) => { 
        console.log(event); // Change variable name to event
        this.eventtForm.reset(); // Change variable name to eventtForm
      });
    }
  }

}
