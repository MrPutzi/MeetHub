import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Event from '../../entities/event';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import {DatePipe, NgFor, NgIf} from '@angular/common'; // Import NgFor directive
import { Observable, map } from 'rxjs';
import { UsersService } from '../../services/users.service';
import {AuthGuard} from "../auth.guard";

@Component({
  selector: 'app-events-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './events-dashboard.component.html',
  styleUrl: './events-dashboard.component.css'
})
export class EventsDashboardComponent implements OnInit {

  userId: string = '';
  attendingEvents: Set<string> = new Set;
  events: Event[] = [];
  selectedEvent?: Event;
  action: string = 'edit';
  actionWithEvent: string = 'new';
  username = '';

  constructor(private eventsService: EventsService,
              private router: Router,
              private usersService: UsersService,
              private authService: AuthGuard){
  }

  ngOnInit() {
    this.userId = this.usersService.getUserId();
    this.loadEvents();
    this.username = this.usersService.getUsername();
    let events$: Observable<Event[]> = this.eventsService.getEvents();
    events$.subscribe({
      next: (events: Event[]) => {
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

  loadEvents() {
    this.eventsService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.events.forEach(event => {
          }
      );
    }
    );
  }



  /*loadEvents(): Event[] {

    this.eventsService.getLocalEvents().subscribe(events => {
      this.events = events;

    });

    return this.events;
  }
*/
  // loadEvents() {
  //   // Load your events from the backend and then check if the user is attending each event
  //   // For simplicity, let's assume you have a method to load events
  //   this.eventsService.getEvents(); // Replace with actual call to load events
  //   this.events.forEach(event => {
  //     this.eventsService.isUserAttending(event, this.userId).subscribe(isAttending => {
  //       if (isAttending) {
  //         this.attendingEvents.add(String(event.id));
  //       }
  //     });
  //   });
  // }

  onEdit(eventId: number) {
    this.router.navigate(['/edit-event', eventId]);
  }

  // onDelete(eventId: number) {
  //   this.eventsService.deleteEvent(eventId).subscribe(response => {
  //     console.log(response); // Handle the response as needed
  //     this.loadEvents(); // Refresh the event list after deleting
  //   });
  // }

  onDelete(event: Event) {
    this.eventsService.deleteEvent(event.id.toString()).subscribe(response => {
      console.log(response); // Handle the response as needed
      //wait few seconds before refreshing the event list
      setTimeout(() => {
        this.loadEvents();
      }, 1000);
    });


  }

  attendEvent(eventId: string, userId: string): void {
    this.eventsService.attendEvent(eventId, userId).subscribe({
      next: (response) => {
        console.log('User added to event successfully', response);
      },
      error: (error) => {
        console.error('Error adding user to event', error);
      }
    });
  }

  deleteUserFromEvent(eventId: string, userId: string): void {
    this.eventsService.deleteUserFromEvent(eventId, userId).subscribe({
      next: () => {
        console.log('User deleted from event successfully');
      },
      error: (error) => {
        console.error('Error deleting user from event', error);
      }
    });
  }


  isUserAttending(eventId: Event): Observable<boolean> {
    return this.eventsService.isUserAttending(eventId, this.userId);
  }

  protected readonly String = String;

}
