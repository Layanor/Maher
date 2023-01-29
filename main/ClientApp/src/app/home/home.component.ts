import { IUser } from './../../api-authorization/authorize.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public error: any;
  public extra: NavigationExtras;
  public baseurl: string;
  public url: string;
  public user: IUser;
  private sub: Subscription;
  private sub2: Subscription;
  constructor(
    private notificationsService: NotificationsService,
    public http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private authorizeService: AuthorizeService,
    private router: Router
  ) {
    const nav = this.router.getCurrentNavigation();
    this.error =
      nav && nav.extras && nav.extras.state && nav.extras.state.error;
    if (this.error !== undefined) {
      this.notificationsService.error(JSON.stringify(this.error?.message));
      console.log(this.error);
      this.extra = { state: { error: this.error } };
    }
    this.baseurl = baseUrl;
  }
  ngOnInit(): void {
    this.sub = this.authorizeService.getUser().subscribe((user) => {
      //  console.log(user);
      if (this.user !== null || this.user !== undefined) {
        this.user = user;
        //  console.log(this.user);
        if (user?.role?.indexOf('Hosp') > -1) {
          this.router.navigate(['/hosp'], this.extra);
        } else if (user?.role?.indexOf('HospClinic') > -1) {
          this.router.navigate(['/hosp'], this.extra);
        } else if (user?.role?.indexOf('Clinic') > -1) {
          this.router.navigate(['/hosp'], this.extra);
        } else if (user?.role?.indexOf('Dir973') > -1) {
          this.router.navigate(['/all'], this.extra);
        } else if (user?.role?.indexOf('Muder') > -1) {
          this.router.navigate(['/muder'], this.extra);
        } else if (user?.role?.indexOf('SuperMuder') > -1) {
          this.router.navigate(['/muder'], this.extra);
        } else if (user?.role === null || user?.role === undefined) {
          this.router.navigate(['/'], this.extra);
        } else if (user?.role?.indexOf('AdminMohDir') > -1) {
          this.router.navigate(['/adminbeds/moh'], this.extra);
        } else {
          this.router.navigate(['/'], this.extra);
        }
      }
    });
    //   console.log(this.user);
    // if (this.user !== undefined) {
    //   setTimeout(() => {
    //     this.url = 'api/x';
    //     this.sub2 = this.post(this.url)
    //       .pipe(
    //         //  retry(3),
    //         catchError((err) => {
    //           //  console.log(err);
    //           return of(null);
    //         })
    //       )
    //       .subscribe((d) => {
    //         console.log(d);
    //       });
    //   }, 10000);
    // }
  }
  public post(url: string, data?: any, params?: any): Observable<any> {
    return this.http.post<any>(this.baseurl + url, data);
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
  navigate(url: string) {
    this.router
      .navigateByUrl('/dumprout', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([url]);
      });
  }
}
