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
  eventForm: FormGroup;
  eventId!: string;

  constructor(
    private fb: FormBuilder,
    private eventService: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required], // Adjusted to handle date format
      location: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.eventId = <string>this.route.snapshot.paramMap.get('id');
    this.loadEvent();
  }

  loadEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe(event => {
      event.date = new Date(event.date).toISOString().slice(0, 16); // Ensure date format is compatible
      this.eventForm.patchValue(event);
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(() => {
        this.router.navigate(['/Dashboard']);
      });
    }
  }
}
