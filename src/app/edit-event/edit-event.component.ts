import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm!: FormGroup;
  eventId!: string;

  constructor(
    private fb: FormBuilder,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {  this.eventForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    date: [new Date(), Validators.required],
    location: ['', Validators.required],
    attendees: ['', Validators.required],
    category: ['', Validators.required]
  });}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    this.eventService.getEvents().subscribe((event: any) => {
      this.eventForm = this.fb.group({
        name: [event.name, Validators.required],
        date: [new Date(event.date).toISOString().slice(0, 16), Validators.required],
        location: [event.location, Validators.required],
        attendees: [event.attendees.join(', ')],
        description: [event.description]
      });
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const updatedEvent = {
        ...this.eventForm.value,
        attendees: this.eventForm.value.attendees.split(',').map((attendee: string) => attendee.trim()),
        date: new Date(this.eventForm.value.date)
      };
      this.eventService.updateEvent(this.eventId, updatedEvent).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
}
