import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  private cache: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    const cacheKey = 'posts';

    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }

    return this.http.get(`${this.apiUrl}/posts`).pipe(
      retry(2),
      tap((data) => (this.cache[cacheKey] = data)),
      catchError(this.handleError)
    );
  }

  getPost(id: number): Observable<any> {
    const cacheKey = `post-${id}`;

    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }

    return this.http.get(`${this.apiUrl}/posts/${id}`).pipe(
      retry(2),
      tap((data) => (this.cache[cacheKey] = data)),
      catchError(this.handleError)
    );
  }

  createPost(post: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/posts`, post)
      .pipe(catchError(this.handleError));
  }

  updatePost(id: number, post: any): Observable<any> {
    delete this.cache[`post-${id}`];

    return this.http
      .put(`${this.apiUrl}/posts/${id}`, post)
      .pipe(catchError(this.handleError));
  }

  // Delete a post
  deletePost(id: number): Observable<any> {
    delete this.cache[`post-${id}`];

    return this.http
      .delete(`${this.apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError));
  }

  getComments(postId: number): Observable<any> {
    const cacheKey = `comments-post-${postId}`;

    if (this.cache[cacheKey]) {
      return of(this.cache[cacheKey]);
    }
    return this.http
      .get(`${this.apiUrl}/comments`, {
        params: { postId: postId.toString() },
      })
      .pipe(
        retry(2),
        tap((data) => (this.cache[cacheKey] = data)),
        catchError(this.handleError)
      );
  }

  // Error handling
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
