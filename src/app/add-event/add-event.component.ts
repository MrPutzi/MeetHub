import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  addEventForm: FormGroup;

  constructor(private eventsService: EventsService, private fb: FormBuilder, private router: Router) {
    this.addEventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addEventForm.valid) {
      this.eventsService.addEvent(this.addEventForm.value).subscribe({
        next: () => this.router.navigate(['/Dashboard']),
        error: (error) => console.error(error)
      });
    }
  }
}
