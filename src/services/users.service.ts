import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, defaultIfEmpty, map, of, tap, throwError } from 'rxjs';
import { Auth } from "../entities/auth";
import { User } from "../entities/user";
import { MessageService } from './message.service';

export const DEFAULT_NAVIGATE_AFTER_LOGIN = "/events";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [
    new User("MarekService","marek@jano.sk"), 
    new User("JanoService","jano@jano.sk",1, new Date(), "tajne"), 
    new User("AdolfService","adolf@ss.de"),
  ];
  private url = "http://localhost:8080/";
  private loggedUserSubject = new BehaviorSubject(this.username);
  navigateAfterLogin = DEFAULT_NAVIGATE_AFTER_LOGIN;

  constructor(private http: HttpClient, 
              private messageService: MessageService) { }

  private get token(): string {
    return localStorage.getItem('umToken') || '';
  }
  private set token(value: string) {
    if (value) {
      localStorage.setItem('umToken', value);
    } else {
      localStorage.removeItem('umToken');
    }   
  }
  private get username(): string {
    return localStorage.getItem('umUsername') || '';
  }
  private set username(value: string) {
    if (value) {
      localStorage.setItem('umUsername', value);
    } else {
      localStorage.removeItem('umUsername');
    }
    this.loggedUserSubject.next(value);   
  }

  public loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable();
  }

  getUsersSynchronous(): User[] {
    return this.users;
  }

  getLocalUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users').pipe(
      map(jsonUsers => this.cloneUsers(jsonUsers)),
      catchError(error => this.errorHandling(error))
    );
  }

  getExtendedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/' + this.token).pipe(
      map(jsonUsers => this.cloneUsers(jsonUsers)),
      catchError(error => this.errorHandling(error))
    );
  }

  private cloneUsers(users: User[]): User[] {
    return users.map(user => User.clone(user));
  }

  public saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "users/" + this.token, user).pipe(
      map(jsonUser => User.clone(jsonUser)),
      catchError(error => this.errorHandling(error))
    );
  }

  public deleteUser(userId: number):Observable<boolean> {
    return this.http.delete(`${this.url}user/${userId}/${this.token}`).pipe(
      map(() => true),
      catchError(error => this.errorHandling(error)),
      defaultIfEmpty(false) 
    )
      //this.url+ 'user/'+ userId + '/' + this.token);
  }

 

  public checkToken(): Observable<boolean> {
    if (!this.token)
      return of(false);
    return this.http.get(this.url + 'check-token/' + this.token).pipe(
      map( () => true),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            this.logout();
            return of(false);
          }
        }
        return this.errorHandling(error);
      })
    );
  }

  login(auth:Auth):Observable<boolean> {
    return this.http.post(this.url + "login", auth,{responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.username = auth.name;
        this.messageService.success("User " + auth.name + " is logged in.");
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.messageService.error("Wrong name or password");
            return of(false);
          }
        }
        return throwError(() => error)
      }),
      catchError(error => this.errorHandling(error))
    );
  }

  logout() {
    this.http.get(this.url + 'logout/' + this.token).pipe(
      tap(() => {
        this.token = '';
        this.username = '';
      }),
      catchError(error => this.errorHandling(error))
    ).subscribe();
  }

  isLoggedIn() : boolean {
    return !!this.token;
  }

  errorHandling(httpError:any):Observable<never> {
    if (httpError instanceof HttpErrorResponse) {
      if (httpError.status === 0) {
        this.messageService.error("Server is not available. Try again later.");
        return EMPTY;
      }
      if (httpError.status < 500) {
        const errMessage = httpError.error.errorMessage 
                              ? httpError.error.errorMessage
                              : JSON.parse(httpError.error).errorMessage;
        if ("unknown token" === errMessage) {
          this.logout();
        }
        this.messageService.error(errMessage);
        return EMPTY;
      }
      if (httpError.status >= 500) {
        this.messageService.error("Server has serious problem, for details look in the console."
                                  + " Contact server administrator.");
      }
    }
    console.error(httpError);
    return EMPTY;
  }
}


