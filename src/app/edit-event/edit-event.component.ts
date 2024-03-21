import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import Event from '../../entities/event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  get currentEvent(): Event {
    return this._currentEvent;
  }

  set currentEvent(value: Event) {
    this._currentEvent = value;
  }

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  private _currentEvent: Event = new Event(
    0, // Default id
    '', // Default name
    new Date(), // Default date
    '', // Default location
    [], // Default attendees
    '' // Default description
  );

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this._currentEvent = this.eventsService.getEventForEditing();

    this.eventForm.patchValue({
      name: this._currentEvent.name,
      date: this._currentEvent.getFormattedDate(),
      location: this._currentEvent.location,
      description: this._currentEvent.description
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const updatedEvent = new Event(
        this._currentEvent.id,
        this.eventForm.value.name || '',
        new Date(this.eventForm.value.date || ''),
        this.eventForm.value.location || '',
        this._currentEvent.attendees,
        this.eventForm.value.description || ''
      );

      this.eventsService.updateEvent(updatedEvent)
        .subscribe(() => {
          console.log('Udalosť úspešne aktualizovaná!');
        }, error => {
          console.error('Chyba pri aktualizácii:', error);
        });
    } else {
      console.log('Formulár je nesprávny!');
    }
  }

  onCancel() {
    console.log('Úpravy zrušené');
  }
}
