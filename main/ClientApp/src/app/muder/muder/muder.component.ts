import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-muder',
  templateUrl: './muder.component.html',
  styleUrls: ['./muder.component.css'],
})
export class MuderComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;
  public isAdmin: Observable<boolean>;

  public error: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.error =
      nav && nav.extras && nav.extras.state && nav.extras.state.error;
  }
  // private authorizeService: AuthorizeService
  ngOnInit(): void {
    if (this.error !== undefined) {
      console.log(this.error);
    }
    // this.isAuthenticated = this.authorizeService.isAuthenticated();
    // this.isAdmin = this.authorizeService.isAdmin();
  }
}
