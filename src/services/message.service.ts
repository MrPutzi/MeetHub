import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Message {
  message: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService implements MessageService {
  handleError(error: any): void {
    console.error('An error occurred:', error);
  }

  private msgSubject = new Subject<Message>();

  getMessages(): Observable<Message> {
    return this.msgSubject.asObservable();
  }

  error(message: string) {
    this.msgSubject.next({ message, type: 'error' });
  }

  success(message: string) {
    this.msgSubject.next({ message, type: 'success' });
  }
}
