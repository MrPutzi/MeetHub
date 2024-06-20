import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Event from '../../entities/event';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import {DatePipe, NgFor, NgIf} from '@angular/common'; // Import NgFor directive
import { Observable, map } from 'rxjs';
import { UsersService } from '../../services/users.service';
import {AuthGuard} from "../auth.guard";
import {MessageService} from "../../services/message.service";

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
              private authService: AuthGuard,
              private messageService: MessageService){
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


  loadEvents() {
    this.eventsService.getEvents().subscribe(
      (events: Event[]) => {
        this.events = events;
      },
      error => {
        this.messageService.error(error);
      }
    );
  }



  onEdit(eventId: number) {
    this.router.navigate(['/edit-event', eventId]).catch(error => {
      // Display the error message to the user
      this.messageService.error(error);
    });
  }

  onDelete(event: Event) {
    this.eventsService.deleteEvent(event.id.toString()).subscribe({
      next: (response) => {
        console.log(response); // Handle the response as needed
        setTimeout(() => {
          this.loadEvents();
        }, 1000);
      },
      error: (error) => {
        this.messageService.error(error);
      }
    });
  }




  protected readonly String = String;

}
