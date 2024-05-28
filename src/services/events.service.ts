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

  constructor(private http: HttpClient) { }

  // getEvents(): Observable<Event[]> {
  //   return this.http.get<Event[]>(this.eventsUrl + '/getevents')
  //     .pipe(
  //       map(response => response.map(this.convertDocumentToEvent)),
  //       catchError(this.handleError)
  //     );
  // }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
   createEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  attendEvent(eventId: Event, username: MouseEvent): Observable<any> {
    const url = `${this.apiUrl}/${eventId}/attend`;
    const body = { username };
    return this.http.post(url, body);
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

  // deleteEvent(eventId: number): Observable<any> {
  //   const url = `${this.eventsUrl}/deleteEvent/${eventId}`;
  //   return this.http.delete(url)
  //     .pipe(catchError(this.handleError));
  // }


  // editEvent(event: Event): Observable<any> {
  //   return this.http.put(this.eventsUrl, event)
  //     .pipe(catchError(this.handleError));
  // }
  //
  // attendEvent(event: string, username: string): Observable<any> {
  //   const url = `${this.eventsUrl}/${event}/attend`;
  //   return this.http.post(url, { username })
  //     .pipe(catchError(this.handleError));
  // }

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
