<<<<<<< HEAD
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
=======
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Event from '../entities/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsUrl = 'http://localhost:8080';  // URL to web api
  private apiUrl = 'http://localhost:8080/api/events';
  private usersOnEventsUrl = 'http://localhost:8080/users-on-events'

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.url}/getevents`).pipe(
      map(documents => documents.map(document => this.convertDocumentToEvent(document))),
      catchError(error => this.errorHandling(error))
    );
  }

  private convertDocumentToEvent(document: any): Event {
    return new Event(
      document.id,
      document.name,
      new Date(document.date),
      document.location,
      document.attendees,
      document.description
      // Add other fields as needed
    );
  }
 
  addEvent(event: Event): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      "name": event.name,
      "date": event.date.toISOString(),
      "location": event.location,
      "attendees": event.attendees,
      "description": event.description
    };
    return this.http.post(`${this.url}/addevent`, body, { headers }).pipe(
      map(() => 'Event added'), 
      catchError(error => this.errorHandling(error))
    );
  }


<<<<<<< HEAD
  public Events: Event[] = [
  new Event(1, "Music listening", new Date(), "Bratislava", ["Marek", "Jano", "Adolf"]),
  new Event(2, "Chilling", new Date(), "Bratislava", ["Marek", "Jano", "Adolf"]),
  new Event(3, "Búchanie zdravotných", new Date(), "Bratislava", ["Marek", "Jano", "Adolf"]),
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
/*
  getEvents(): Observable<Event[]> {
    const params = new HttpParams()
      .set('dbName', 'test')
      .set('collectionName', 'event');

    return this.http.get<Event[]>(`${this.url}/getevents`, { params }).pipe(
      map(jsonEvents => jsonEvents.map(jsonEvent => Event.clone(jsonEvent))),
      catchError(error => this.errorHandling(error))
    );
  }
*/



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
=======

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
>>>>>>> 3f3e581c7ea08cea88c44bd9c258c2a81a777a2b
  }


  getEventById(eventId: string): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<any>(url);
  }

  updateEvent(eventId: string, event: any): Observable<any> {
    const url = `${this.apiUrl}/update/${eventId}`;
    return this.http.put<any>(url, event);
  }

  addEvent(event: any): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.http.post<any>(url, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }


  attendEvent(eventId: string, userId: string): Observable<any> {
    const url = `${this.usersOnEventsUrl}/add/${eventId}/${userId}`;
    return this.http.post(url, {});
  }

  deleteUserFromEvent(eventId: string, userId: string): Observable<void> {
    const url = `${this.usersOnEventsUrl}/delete/${eventId}/${userId}`;
    return this.http.delete<void>(url);
    }



  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }

  private convertDocumentToEvent(document: any): Event {
    if (document) {
      return new Event(
        document.id,
        document.name,
        document.date,
        document.location,
        document.description
      );
    } else {
      console.error('Document is null');
      // Return a default Event object instead of null
      return new Event(Number(''), '', new Date(), '',  '');
    }
  }


  isUserAttending(event: Event, userId: string): Observable<boolean> {
    const url = `${this.usersOnEventsUrl}/is-user-attending/${event.id}/${userId}`;
    return this.http.get<boolean>(url);
  }
}
