import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Event from '../../entities/event';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import {NgFor, NgIf} from '@angular/common'; // Import NgFor directive
import { Observable, map } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-events-dashboard',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './events-dashboard.component.html',
  styleUrl: './events-dashboard.component.css'
})
export class EventsDashboardComponent implements OnInit {


  events: Event[] = [];
  selectedEvent?: Event;
  action: string = 'edit';
  actionWithEvent: string = 'new';
  eventToEdit: Event = new Event(0, '', new Date(), '', []);
  username = '';

  constructor(private eventsService: EventsService, private router: Router, private usersService: UsersService) {
  }

  ngOnInit() {
    this.loadEvents();
    this.username = this.usersService.getUsername();
    let events$: Observable<Event[]> = this.eventsService.getEvents();
    events$.subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
  }

  onSelected(event: Event) {
    this.selectedEvent = event;
  }


  /*loadEvents(): Event[] {

    this.eventsService.getLocalEvents().subscribe(events => {
      this.events = events;

    });

    return this.events;
  }
*/
  loadEvents() {
    this.eventsService.getEvents().subscribe(events => {
      this.events = events;
    });
    return this.events;
  }

  onEdit(eventId: number) {
    this.router.navigateByUrl('/edit-event/' + eventId);
  }

  // onDelete(eventId: number) {
  //   this.eventsService.deleteEvent(eventId).subscribe(response => {
  //     console.log(response); // Handle the response as needed
  //     this.loadEvents(); // Refresh the event list after deleting
  //   });
  // }

onDelete(eventId: Event) {
  this.eventsService.deleteEvent(eventId.id).subscribe(() => {
    console.log(`Event with ID ${eventId.id} deleted!`);
    this.loadEvents();
  });


}
  onAttend(event: Event) {
    this.eventsService.attendEvent(event.id.toString(), this.username).subscribe(response => {
      console.log(response); // Handle the response as needed
      this.loadEvents(); // Refresh the event list after attending
    });
  }

//add a function that will check if the user is in the attendees list


}
