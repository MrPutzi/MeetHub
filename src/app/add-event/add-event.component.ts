import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import ReactiveFormsModule from '@angular/forms';
@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private eventsService: EventsService // inject the service
  ) {
    this.eventForm = this.formBuilder.group({
      // replace with your event fields
      name: '',
      date: '',
      location: ''
    });
  }

  onSubmit() {
    this.eventsService.saveLocalEvent(this.eventForm.value).subscribe(() => {
      console.log('Event saved successfully!');
    });
  }
}