import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  msgSubject = new Subject<Message>();
  users: User [] = [];

  constructor() { }

  isAdmin(userId: number): boolean {
    const user = this.users.find(user => user.id === userId);
    return user?.role === 'admin';
  }
  
  getMessages(): Observable<Message> {
    return this.msgSubject.asObservable();
  }

  error(message: string) {
    this.msgSubject.next({message, type:'error'});
  }

  success(message: string) {
    this.msgSubject.next({message, type:'success'});
  }
}

export interface Message {
  message: string;
  type: 'error'|'success';
}
