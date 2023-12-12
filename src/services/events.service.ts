import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import  Event  from '../entities/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private url = 'http://localhost:8080/events'; // replace with your server's URL

  constructor(private http: HttpClient) {}

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.url, event);
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

  deleteEvent(id: number): Observable<Event> {
    return this.http.delete<Event>(`${this.url}/${id}`);
  }


}