import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Event from '../entities/event';
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsUrl = 'http://localhost:8080';  // URL to web api
  private apiUrl = 'http://localhost:8080/api/events';
  private usersOnEventsUrl = 'http://localhost:8080/users-on-events'

  constructor(private http: HttpClient, private messageService: MessageService) {
  }


  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl)
      .pipe(catchError(this.handleError.bind(this)));
  }


  getEventById(eventId: string): Observable<any> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<any>(url);
  }

  addEvent(event: any) {
    return this.http.post('/api/events', event)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
    }

  updateEvent(eventId: string, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/update/${eventId}`, event)
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.messageService.error(errorMessage); // This will display the error message to the user
    return throwError(errorMessage);
  }


}


