import { Component, OnInit, OnDestroy } from '@angular/core';
import {  Observable, Subscription } from 'rxjs';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { UserCompType } from '../../../app/classes/basedata';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  public isauth: boolean = false;
  public isAdmin: Observable<boolean>;
  public iscalldir: Observable<boolean>;
  public ishosp: Observable<boolean>;
  public isstaticuser: Observable<boolean>;
  public sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;
  public isclinic: Observable<boolean>;
  public isAuthenticated: Observable<boolean>;
  public usercomptype: Observable<UserCompType[]>;
  public useremail: Observable<string>;



  constructor(
    private authorizeService: AuthorizeService,
    private router: Router
  ) {}

  isExpanded = false;

  ngOnInit(): void {
    this.usercomptype = this.authorizeService.getUsercomptype()
     // .pipe(tap(u => console.log("nav", u)))
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.isAdmin = this.authorizeService.isAdmin();
    this.iscalldir = this.authorizeService.isCalldiruser();
    this.ishosp = this.authorizeService.ishospuser();
    this.isclinic = this.authorizeService.isclinicuser();
    this.useremail =  this.authorizeService.getUseremail()

  }

  ngOnDestroy(): void {
    if (this.sub1) {
      //  console.log(this.sub)
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      //  console.log(this.sub)
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      //  console.log(this.sub)
      this.sub3.unsubscribe();
    }

  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  navigate(url: string) {
    this.router
      .navigateByUrl('/dumprout', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([url]);
      });
  }
}
