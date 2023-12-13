import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, defaultIfEmpty, map, of } from 'rxjs';
import  Event  from '../entities/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url = 'http://localhost:8080/'; // replace with your server's URL


  public Events: Event[] = [
  new Event(1, "Music listening", new Date(), "Bratislava", ["Marek", "Jano", "Adolf"]),
  new Event(2, "Chilling", new Date(), "Bratislava", ["Marek", "Jano", "Adolf"]),
  new Event(3, "Búchanie zdravotných", new Date(), "Bratislava", ["Marek", "Jano", "Adolf"]),
  { id: 4, name: "Music listening", date: new Date(), location: "Bratislava", attendees: ["Marek", "Jano", "Adolf"] },
  { id: 5, name: "Chilling", date: new Date(), location: "Bratislava", attendees: ["Marek", "Jano", "Adolf"] },
  { id: 6, name: "Búchanie zdravotných", date: new Date(), location: "Bratislava", attendees: ["Marek", "Jano", "Adolf"]}
  ];


  constructor(private http: HttpClient) {}

  getEventsSynchronous(): Event[] {
    return this.Events;
  }

  public saveLocalEvent(event: Event): Observable<Event> {
    event.id = this.Events.length + 1;
    this.Events.push(event);
    localStorage.setItem('events', JSON.stringify(this.Events));
    return of(event);
  }

  getLocalEvents(): Observable<Event[]> {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]') as Event[];
    const allEvents = [...this.Events, ...localEvents];
    return of(allEvents);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.url}/${id}`);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.url}/${event.id}`, event);
  }

  private cloneEvents(): Event[] {
    return this.Events.map(event => Event.clone(event));
  }

  public saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url, event).pipe(
      map(jsonEvent => Event.clone(jsonEvent)),
      catchError(error => this.errorHandling(error))
    );
  }


  public deleteEvent(eventId: number): Observable<boolean> {
    return this.http.delete(`${this.url}/${eventId}`).pipe(
      map(() => true),
      catchError(error => this.errorHandling(error)),
      defaultIfEmpty(false) 
    );
  }
 
  errorHandling(httpError:any):Observable<never> {
    if (httpError instanceof HttpErrorResponse) {
      if (httpError.status === 0) {
        return EMPTY;
      }
      if (httpError.status < 500) {
        const errMessage = httpError.error.errorMessage 
                              ? httpError.error.errorMessage
                              : JSON.parse(httpError.error).errorMessage;
        if ("unknown token" === errMessage) {
          console.log("Unknown token");
        }
        return EMPTY;
      }
      if (httpError.status >= 500) {
        console.log("Server error: " + httpError.error.errorMessage)
      }
    }
    console.error(httpError);
    return EMPTY;
  }


}