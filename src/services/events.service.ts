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

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl + '/getevents')
      .pipe(
        map(response => response.map(this.convertDocumentToEvent)),
        catchError(this.handleError)
      );
  }

  getEventById(id: string): Observable<Event> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<Event>(url)
      .pipe(
        map(this.convertDocumentToEvent),
        catchError(this.handleError)
      );
  }

  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event)
      .pipe(
        map(this.convertDocumentToEvent),
        catchError(this.handleError)
      );
  }

  // deleteEvent(eventId: number): Observable<Event> {
  //   const url = `${this.eventsUrl}/deleteEvent/${eventId}`;
  //   return this.http.delete<Event>(url)
  //     .pipe(
  //       map(response => {
  //         if (response) {
  //           return this.convertDocumentToEvent(response);
  //         } else {
  //           console.error(`Event with ID ${eventId} not found`);
  //           return new Event(Number(''), '', new Date(), '', [], '');
  //         }
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.eventsUrl}/${eventId}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError));
  }


  editEvent(event: Event): Observable<any> {
    return this.http.put(this.eventsUrl, event)
      .pipe(catchError(this.handleError));
  }

  attendEvent(event: string, username: string): Observable<any> {
    const url = `${this.eventsUrl}/${event}/attend`;
    return this.http.post(url, { username })
      .pipe(catchError(this.handleError));
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
        document.attendees,
        document.description
      );
    } else {
      console.error('Document is null');
      // Return a default Event object instead of null
      return new Event(Number(''), '', new Date(), '', [], '');
    }
  }
}
