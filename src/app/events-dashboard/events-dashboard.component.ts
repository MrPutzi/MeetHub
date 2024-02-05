import { Component, Input, OnChanges, OnInit } from '@angular/core';
import Event from '../../entities/event';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { NgFor } from '@angular/common'; // Import NgFor directive
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-events-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './events-dashboard.component.html',
  styleUrl: './events-dashboard.component.css'
})
export class EventsDashboardComponent implements OnInit{
  
  events:Event[] = [];
  actionWithEvent: string = 'new';
  eventToEdit:Event = new Event(0, '', new Date(), '', []);

  constructor(private eventsService: EventsService, private router: Router) { }

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
    this.eventsService.deleteEvent(event.id!).subscribe(() => {
      this.loadEvents();
    });
  }


  onNew() {
    this.router.navigateByUrl('/AddEvent');
  }

}
