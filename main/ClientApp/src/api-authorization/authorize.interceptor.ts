import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthorizeService } from './authorize.service';
import { mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
@Injectable({
  providedIn: 'root',
})
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(
    private authorize: AuthorizeService,
    private router: Router,
    private ns: NotificationsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authorize
      .getAccessToken()
      .pipe(
        mergeMap((token) => this.processRequestWithToken(token, req, next))
      );
  }

  private processRequestWithToken(
    token: string,
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (!!token && this.isSameOriginUrl(req)) {
      req = req.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(req).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authorize.signOut({ local: true });
              window.sessionStorage.clear();
              window.localStorage.clear();
              this.router.navigateByUrl('Identity/Account/Login');
              this.ns.error('تم  تسجيل خروجك الرجاء اعادة تسجيل الدخول');
              console.log('تم  تسجيل خروجك الرجاء اعادة تسجيل الدخول');
              console.log(err);
            }
            if (
              err.url.includes('Identity/Account/Login')
              // && !pathname.includes(AppRoutes.authorizationLogin)
            ) {
              this.router.navigateByUrl(
                'Identity/Account/Login',
                /* Removed unsupported properties by Angular migration: queryParams. */ {}
              );
            }
          }
          return throwError(err);
        })
      );
    }
  }

  private isSameOriginUrl(req: any) {
    if (req.url.startsWith(`${window.location.origin}/`)) {
      return true;
    }
   
    if (req.url.startsWith(`//${window.location.host}/`)) {
      return true;
    }

    if (/^\/[^\/].*/.test(req.url)) {
      return true;
    }
    return false;
  }
}
