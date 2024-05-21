import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import Event from '../../entities/event';
import {User} from "../../entities/user";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit, OnChanges {
  @Input({ required: true }) user!: User;
  @Input() actionWithUser: string = 'new';
  @Output('changed') eventPipe = new EventEmitter<User>();





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
    this.eventForm.valueChanges.subscribe(() => {
      console.log('Formulár bol zmenený');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user = User.clone(this.user);
    if (this.actionWithUser === 'edit') {
      this.eventForm.patchValue({
        date: undefined, description: undefined, location: undefined,
        name: this.user.name
      });
      this.eventForm.disable();
    }
  }


  onSubmit() {
    if (this.eventForm.valid) {
      const updatedEvent = new Event(
        this._currentEvent.id,
        this.eventForm.value.name ?? '',
        new Date(this.eventForm.value.date ?? ''),
        this.eventForm.value.location ?? '',
        this._currentEvent.attendees,
        this.eventForm.value.description ?? ''
      );

      this.eventsService.editEvent(updatedEvent)
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
