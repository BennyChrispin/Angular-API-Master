import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/posts`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getPost(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/posts/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  createPost(post: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/posts`, post)
      .pipe(catchError(this.handleError));
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/posts/${id}`, post)
      .pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError));
  }

  getComments(postId: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/comments`, {
        params: { postId: postId.toString() },
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMsg);
  }
}
