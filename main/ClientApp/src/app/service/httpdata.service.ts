import { Injectable, Inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError, delay, retryWhen, tap } from 'rxjs/operators';


// let headers: HttpHeaders = new HttpHeaders();

/* const name = 'XSRF-TOKEN' + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for (var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    var tt = c.substring(name.length, c.length);
    console.log("ttt", tt);

  }
}  */
@Injectable({
  providedIn: 'root',
})
export class HttpdataService {
  public baseurl: string;
  public xsrfsub = new BehaviorSubject<string>(null);
  constructor(
   
    public http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,

  ) {
    this.baseurl = baseUrl;
  }
  public get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url).pipe(retry(3), catchError(this.handleError));
  }
  public post<T>(url: string, data?: any, params?: any): Observable<T> {
    return this.http.post<T>(this.baseurl + url, data);
  }
  public postget<T>(url: string, data?: any, params?: any): Observable<T> {

    return this.http .post<T>(this.baseurl + url, data).pipe(catchError(this.handleError));

   
  }
  public numbernotuse(url: string): Observable<boolean> {
   // console.log(url);
    return this.http.post<any>(this.baseurl + url, null).pipe(
      retryWhen((errors) => {
        return errors.pipe(tap(() => console.log('retrying...')));
      }),
      catchError(this.handleError)
    );
  }
  public delete<T>(url: any, data?: any): Observable<T> {
    return this.http
      .delete<T>(this.baseurl + url)
      .pipe(catchError(this.handleError));
  }
  public put<T>(url: string, data?: any, params?: any): Observable<T> {
    return this.http
      .put<T>(this.baseurl + url, data, { params: params })
      .pipe(catchError(this.handleError));
  }
  public patch<T>(url: string, data?: any, params?: any): Observable<T> {
    return this.http
      .patch<T>(this.baseurl + url, data, { params: params })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
  return   throwError(() =>error)}
}
