import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, defaultIfEmpty, map, of } from 'rxjs';
import Event from '../entities/event';
import { HttpParams } from '@angular/common/http';
import { User } from '../entities/user';
import { M } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  attendEvent(eventId: string, username: string) {
    return this.http.post(`${this.url}/attendevent`, { eventId, username }).pipe(
      catchError(error => this.errorHandling(error))
    );
  }


  static addAttendee(id: number, user: User) {

  }

  private url = 'http://localhost:8080'; // replace with your server's URL

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
    const body = JSON.stringify(event);
    return this.http.post<string>(`${this.url}/addevent`, body, { headers }).pipe(
      map(() => 'Event added successfully'),
      catchError(error => this.errorHandling(error))
    );
  }


  public Events: Event[] = [];

  constructor(private http: HttpClient) { }

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

  public saveEvent(event: Event) {
    return this.http.post(`${this.url}`, event);
  }



  deleteEvent(event: Event): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/deleteEvent/${event.id}`);
  }

  errorHandling(httpError: any): Observable<never> {
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

  getEventForEditing(): Event {
    // Provide default values for the Event constructor
    return new Event(
      0, // Default id
      '', // Default name
      new Date(), // Default date
      '', // Default location
      [], // Default attendees
      '' // Default description
    );
  }


}
