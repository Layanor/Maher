import { finalize, tap, catchError, delay } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { SpinerService } from '../service/Spiner.Service';
import { ReturnUrlType } from '../../api-authorization/api-authorization.constants';
import { Router } from '@angular/router';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { ApiError } from '../../app/classes/apierror';

@Injectable()
export class ErrorLoggingInterceptor implements HttpInterceptor {
  constructor(
    private authorize: AuthorizeService,
    private router: Router,
    private spiner: SpinerService,
    private notificationsService: NotificationsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    this.spiner.show();
    return next.handle(req).pipe(
      delay(500),
      catchError((error: HttpErrorResponse) => {
        console.log('ErrorLoggingInterceptor', error);
        if (error) {
          let msg = '';
          const status: number = error.status;

          if (error.error instanceof Blob) {
            this.notificationsService.error(
              ' الملف المرفق غير موجود الرجاء طلب الدعم '
            );
            return of(null);
          } else if (error.error != null) {
            const apierror = <ApiError>error?.error;
            if (apierror?.Message !== undefined) {
              msg = apierror?.Message;
            } else {
              msg = error?.error?.message;
            }
            if (apierror?.ModelStateErrors !== undefined && apierror?.ModelStateErrors !== null) {
              apierror?.ModelStateErrors?.forEach((element) => {
                msg = msg + ' ' + element.Message;
              });
            }
          } else {
            msg = error.message;
          }
          switch (status) {
            case 0:
              this.notificationsService.error(
                status,
                'لا يمكن الوصول للسرفر ',
                'الرجاء التاكد من اتصالك بالانترنت',
                msg
              );
              break;
            case 500:
              this.notificationsService.error('خطاء بالسرفر', msg);
              this.router.navigateByUrl('/');
              break;
            case 401:
              this.notificationsService.error(
                status,
                'الرجاء تسجيل الدخول من جديد '
              );
              setTimeout(() => {
                this.authorize.signOut('/');
                window.sessionStorage.clear();
                window.localStorage.clear();
                sessionStorage.clear();
                this.router.navigateByUrl('/authentication/logout');
              }, 4000);

              break;
            case 403:
              this.notificationsService.error(status, "لا تملك صلاحية - الرجاء تسجيل الدخول بحساب اخر");
              break;
            case 400:
              this.router.navigateByUrl('/');
              this.notificationsService.error(status, msg);
              break;
            case 404:
              this.notificationsService.error(status, msg);
              break;
            default:
              this.notificationsService.error('خطاء ' + '  ' + status, msg);
              this.router.navigateByUrl('/');
              break;
          }
          if (error.error != null) {
            return throwError(error);
          } else {
            return of(null);
          }
        }
      }),
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        // Operation failed; error is an HttpErrorResponse
        (error) => (ok = 'failed')
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        //const elapsed = Date.now() - started;
        //const msg = `${req.method} "${req.urlWithParams}"
        //     ${ok} in ${elapsed} ms.`;
        //this.messenger.add(msg);
        this.spiner.notshow();
      })
    );
  }
}
interface INavigationState {
  [ReturnUrlType]: string;
}
