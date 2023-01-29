import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, tap, zip, first } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { HttpdataService } from './httpdata.service';
import { BaseData, Medwithclinic, UserCompType } from '../classes/basedata';
import { CompTypes } from '../classes/mod';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class StoreService {
  constructor(
    private authorizeService: AuthorizeService,
    private dataService: HttpdataService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}
  public Url = 'api/BaseData/idtypelist';
  public Url2 = 'api/BaseData/typeOfComplain';
  public Url3 = 'api/BaseData/callSour';
  public Url4 = 'api/BaseData/med';
  public Url5 = 'api/DirCall937s/comptypeList';
  public Url6 = 'api/BaseData/dirtakenlist';
  private idtypelistSubject = new BehaviorSubject<BaseData[]>(null);
  private typeOfComplainSubject = new BehaviorSubject<BaseData[]>(null);
  private callSourSubject = new BehaviorSubject<BaseData[]>(null);
  private medSubject = new BehaviorSubject<Medwithclinic[]>(null);
  private usercomptySubject = new BehaviorSubject<UserCompType[]>(null);
  private allcomptypeSubject = new BehaviorSubject<CompTypes[]>(null);
  private alldirtakenactioSubject = new BehaviorSubject<BaseData[]>(null);

  public idtypelist: Observable<BaseData[]> =
    this.idtypelistSubject.asObservable();
  // this.idtypelistSubject.getValue() === null
  //   ? this.dataService
  //       .postget<BaseData[]>(this.Url)
  //       .pipe(tap((d) => this.idtypelistSubject.next(d)))
  //   : this.idtypelistSubject.asObservable();

  public typeOfComplain: Observable<BaseData[]> =
    this.typeOfComplainSubject.asObservable();

  // this.typeOfComplainSubject.getValue() != null
  //   ? this.typeOfComplainSubject.asObservable()
  //   : this.dataService
  //       .postget<BaseData[]>(this.Url2)
  //       .pipe(tap((d) => this.typeOfComplainSubject.next(d)));

  public callSour: Observable<BaseData[]> = this.callSourSubject.asObservable();
  //this.callSourSubject.getValue() != null
  //  ? this.callSourSubject.asObservable()
  //  : this.dataService
  //      .postget<BaseData[]>(this.Url3)
  //      .pipe(tap((d) => this.callSourSubject.next(d)));

  public med: Observable<Medwithclinic[]> = this.medSubject.asObservable();
  //this.medSubject.getValue() != null
  //  ? this.medSubject.asObservable()
  //  : this.dataService
  //      .postget<Medwithclinic[]>(this.Url4)
  //      .pipe(tap((d) => this.medSubject.next(d)));

  public usercompty: Observable<UserCompType[]> =
    this.usercomptySubject.asObservable();
  //this.usercomptySubject.getValue() != null
  //  ? this.usercomptySubject.asObservable()
  //  : this.authorizeService
  //      .getUsercomptype()
  //      .pipe(tap((d) => this.usercomptySubject.next(d)));

  public allcomptype: Observable<CompTypes[]> =
    this.allcomptypeSubject.asObservable();
  public alldirtakenaction: Observable<BaseData[]> =
    this.alldirtakenactioSubject.asObservable();

  public isAuthenticated: Observable<boolean> =
    this.authorizeService.isAuthenticated();

  public xsrfsub = new BehaviorSubject<string>(null);

  initbasedata() {
    // if (this.isAuthenticated) {

    //if (this.usercomptySubject.getValue() == null) {
    //  this.authorizeService
    //    .getUsercomptype()
    //    .subscribe((d) => this.usercomptySubject.next(d),
    //      (error) => this.handleError(error));
    //}

    //if (this.idtypelistSubject.getValue() == null) {
    //  this.dataService
    //    .postget<BaseData[]>(this.Url)
    //    .subscribe((d) => this.idtypelistSubject.next(d),
    //      (error) => this.handleError(error));
    //}

    //if (this.typeOfComplainSubject.getValue() == null) {
    //  this.dataService.postget<BaseData[]>(this.Url2).subscribe(
    //    (d) => this.typeOfComplainSubject.next(d),
    //    (error) => this.handleError(error)
    //  );
    //}

    //if (this.callSourSubject.getValue() == null) {
    //  this.dataService
    //    .postget<BaseData[]>(this.Url3)
    //    .subscribe((d) => this.callSourSubject.next(d),
    //      (error) => this.handleError(error));
    //}

    //if (this.medSubject.getValue() == null) {
    //  this.dataService
    //    .postget<Medwithclinic[]>(this.Url4).pipe(tap())
    //    .subscribe((d) => this.medSubject.next(d),
    //      (error) => this.handleError(error));
    //}

    //if (this.allcomptypeSubject.getValue() == null) {
    //  this.dataService
    //    .postget<CompTypes[]>(this.Url5)
    //    .subscribe((d) => this.allcomptypeSubject.next(d),
    //      (error) => this.handleError(error));
    //}
    //if (this.alldirtakenactioSubject.getValue() == null) {
    //  this.dataService
    //    .postget<BaseData[]>(this.Url6)
    //    .subscribe((d) => this.alldirtakenactioSubject.next(d),
    //      (error) => this.handleError(error));
    //}
    //} else {
    //  sessionStorage.clear();
    //  this.notificationsService.error('الرجاء تسجيل الدخول من جديد ');
    //  this.authorizeService.signOut('/');
    //  this.router.navigateByUrl('/authentication/logout');
    //}
    return zip(
      this.idtypelistSubject.getValue() != null
        ? this.idtypelist.pipe(first())
        : this.dataService.postget<BaseData[]>(this.Url).pipe(
            tap(
              (d) => this.idtypelistSubject.next(d),
              (error) => this.handleError(error)
            )
          ),
      this.typeOfComplainSubject.getValue() != null
        ? this.typeOfComplain.pipe(first())
        : this.dataService.postget<BaseData[]>(this.Url2).pipe(
            tap(
              (d) => this.typeOfComplainSubject.next(d),
              (error) => this.handleError(error)
            )
          ),
      this.callSourSubject.getValue() != null
        ? this.callSour.pipe(first())
        : this.dataService.postget<BaseData[]>(this.Url3).pipe(
            tap(
              (d) => this.callSourSubject.next(d),
              (error) => this.handleError(error)
            )
          ),
      this.medSubject.getValue() != null
        ? this.med.pipe(first())
        : this.dataService.postget<Medwithclinic[]>(this.Url4).pipe(
            tap(
              (d) => this.medSubject.next(d),
              (error) => this.handleError(error)
            )
          ),
      this.usercomptySubject.getValue() != null
        ? this.usercompty.pipe(first())
        : this.authorizeService.getUsercomptype().pipe(
            tap(
              (d) => this.usercomptySubject.next(d),
              (error) => this.handleError(error)
            )
          ),
      this.allcomptypeSubject.getValue() != null
        ? this.allcomptype.pipe(first())
        : this.dataService.postget<CompTypes[]>(this.Url5).pipe(
            tap(
              (d) => this.allcomptypeSubject.next(d),
              (error) => this.handleError(error)
            )
          )
      //  this.alldirtakenactioSubject.getValue() != null ? this.alldirtakenaction.pipe(first()) : this.dataService.postget<BaseData[]>(this.Url6).pipe(tap((d) => this.alldirtakenactioSubject.next(d))),
    );
  }
  inittakaction() {
    //if (this.alldirtakenactioSubject.getValue() == null) {
    //  this.dataService
    //    .postget<BaseData[]>(this.Url6)
    //    .subscribe((d) => this.alldirtakenactioSubject.next(d),
    //      (error) => this.handleError(error));
    //}
    return this.alldirtakenactioSubject.getValue() != null
      ? this.alldirtakenaction.pipe(first())
      : this.dataService.postget<BaseData[]>(this.Url6).pipe(
          tap(
            (d) => this.alldirtakenactioSubject.next(d),
            (error) => this.handleError(error)
          )
        );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('errr:', JSON.stringify(error));
    const status: number = error.status;
    const extra: NavigationExtras = { state: { error: error.error } };
    switch (status) {
      case 500:
        this.notificationsService.error(
          'خطاء بالسرفر' + '  ' + error.status,
          error?.error?.Message
        );
        this.router.navigateByUrl('/');
        break;
      case 401:
        this.notificationsService.error('الرجاء تسجيل الدخول من جديد ');
        this.notificationsService.error(error?.error?.Message);
        this.authorizeService.signOut('/');
        sessionStorage.clear();
        this.router.navigateByUrl('/authentication/logout');
        break;
      // case 202:

      //   break;
      case 400:
        console.log(error?.error?.Message);
        this.router.navigateByUrl('/');
        this.notificationsService.error('الرجاء تحديث الصفحة');
        break;
      case 0:
        this.notificationsService.error('الرجاء التأكد من اتصالك بالانترنت ');
        this.router.navigateByUrl('/');
        break;
      default:
        this.notificationsService.error(
          'خطاء ' + '  ' + error.status,
          error.error.Message
        );
        this.router.navigateByUrl('/');
        break;
    }
    if (error.error?.errors != null) {
      this.notificationsService.error(error.error.Message);
      console.log('errorins' + JSON.stringify(error));
      this.notificationsService.error(
        'خطاء ' + '  ' + error.status,
        error.error.Message
      );
    }
    return throwError(error);
    // if (error.status === 401) {
    //   console.log('تم  تسجيل خروجك الرجاء اعادة تسجيل الدخول');
    //   sessionStorage.clear();
    //   this.router.navigate(['Identity/Account/Login']);
    //   return throwError(error?.error?.Message);
    // } else {
    //   this.router.navigate(['/']);
    //   return throwError(error?.error?.Message);
    // }

    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error?.error?.Message);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //       `body was: ${JSON.stringify(error)}`
    //   );
    // }
    // return an observable with a user-facing error message
    // return throwError(error?.error?.Message);
  }
}
//this.sub = this.authorizeService.isAuthenticated()
//  .pipe(debounceTime(1000), tap(d => console.log(d))).subscribe(d => {
//    if (d) {
//      console.log("init store1" + d)
//      if (this.usercomptySubject.getValue() == null) {
//        this.authorizeService
//          .getUsercomptype()
//          .subscribe((d) => this.usercomptySubject.next(d),
//            (error) => this.handleError(error));
//      }

//      if (this.idtypelistSubject.getValue() == null) {
//        this.dataService
//          .postget<BaseData[]>(this.Url)
//          .subscribe((d) => this.idtypelistSubject.next(d),
//            (error) => this.handleError(error));
//      }

//      if (this.typeOfComplainSubject.getValue() == null) {
//        this.dataService.postget<BaseData[]>(this.Url2).subscribe(
//          (d) => this.typeOfComplainSubject.next(d),
//          (error) => this.handleError(error)
//        );
//      }

//      if (this.callSourSubject.getValue() == null) {
//        this.dataService
//          .postget<BaseData[]>(this.Url3)
//          .subscribe((d) => this.callSourSubject.next(d),
//            (error) => this.handleError(error));
//      }

//      if (this.medSubject.getValue() == null) {
//        this.dataService
//          .postget<Medwithclinic[]>(this.Url4)
//          .subscribe((d) => this.medSubject.next(d),
//            (error) => this.handleError(error));
//      }

//      if (this.allcomptypeSubject.getValue() == null) {
//        this.dataService
//          .postget<CompTypes[]>(this.Url5)
//          .subscribe((d) => this.allcomptypeSubject.next(d),
//            (error) => this.handleError(error));
//      }
//      if (this.alldirtakenactioSubject.getValue() == null) {
//        this.dataService
//          .postget<BaseData[]>(this.Url6)
//          .subscribe((d) => this.alldirtakenactioSubject.next(d),
//            (error) => this.handleError(error));
//      }

//    }
//  });
// console.log('a', this.idtypelistSubject.getValue());
// console.log('b', this.medSubject.getValue());
// console.log('c', this.typeOfComplainSubject.getValue());
// console.log('d', this.callSourSubject.getValue());
