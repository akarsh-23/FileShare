import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = '/api/response';

  constructor(private http: HttpClient) {}

  // Method to send a GET request with the query
  getResponse(query: string): Observable<string> {
    return this.http.get<{ data: string }>(`${this.apiUrl}?query=${encodeURIComponent(query)}`)
      .pipe(
        map(response => response.data), // Extract 'data' from the response
        catchError(err => {
          console.error('Error occurred:', err);
          return throwError(() => new Error('Error retrieving response'));
        })
      );
  }
}
