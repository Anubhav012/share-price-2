import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NSETopGainerService {

  private apiUrl = 'http://localhost:3000/api'; // Update the URL accordingly

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    // Use interval to emit a value every 5 seconds
    return interval(5000).pipe(
      // Use switchMap to cancel previous requests if a new one comes in
      switchMap(() => this.http.get<any>('http://localhost:3000/api'))
    );
  }
}
// fetchData(): Observable<any> {
//   return this.http.get<any>('http://localhost:3000/api');
// }
// }