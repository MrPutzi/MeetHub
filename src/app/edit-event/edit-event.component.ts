import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { MessageService } from '../../services/message.service';

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
    private router: Router,
    private messageService: MessageService
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
    this.eventService.getEventById(this.eventId).pipe(
      catchError(error => this.handleError(error))
    ).subscribe(event => {
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

  handleError(error: any): Observable<never> {
    if (error.status === 0) {
      this.messageService.error("Network error: Please check your internet connection.");
    } else if (error.status >= 400 && error.status < 500) {
      this.messageService.error("Client error: Please check the data you have entered.");
    } else if (error.status >= 500) {
      this.messageService.error("Server error: Please try again later.");
    } else {
      this.messageService.error("An unexpected error occurred. Please try again.");
    }
    console.error(error);
    return throwError(error);
  }
}
