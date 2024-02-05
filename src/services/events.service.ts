import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, defaultIfEmpty, map, of } from 'rxjs';
import Event from '../entities/event';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
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