import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Event from '../../entities/event';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { NgFor } from '@angular/common'; // Import NgFor directive
import { Observable, map } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { User } from '../../entities/user';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-events-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events-dashboard.component.html',
  styleUrl: './events-dashboard.component.css'
})
export class EventsDashboardComponent implements OnInit{

  onAttend(event: Event) {
    const eventId = event.id.toString();
    const username = this.username;
    this.eventsService.attendEvent(eventId, username).subscribe(response => {
      console.log(response); // Handle the response as needed
    });
  }


  addAttendee(id: number, user: User) {
    EventsService.addAttendee(id, user);
  }

  events: Event[] = [];
  actionWithEvent: string = 'new';
  eventToEdit: Event = new Event(0, '', new Date(), '', []);
  username = '';

  constructor(private eventsService: EventsService, private router: Router, private usersService: UsersService) { }

  ngOnInit() {
    this.loadEvents();
  }

  /*loadEvents(): Event[] {
    
    this.eventsService.getLocalEvents().subscribe(events => {
      this.events = events;
    
    });
    
    return this.events;
  }
*/
loadEvents(){
  this.eventsService.getEvents().subscribe(events => {
    this.events = events;
  });
  return this.events;
}

onEdit(event: Event) {
  this.actionWithEvent = 'edit';
  this.eventToEdit = event;
}

onDelete(event: Event) {
  const confirmation = confirm("Delete this task: " + event.name + "?");
  if (confirmation) {
      this.eventsService.deleteEvent(event).subscribe(() => {
          this.loadEvents();
      });
  }
}



  onNew() {
    this.router.navigateByUrl('/AddEvent');
  }

}
