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



  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
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
