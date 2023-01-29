import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'app-muder-nav-menu',
  templateUrl: './muder-nav-menu.component.html',
  styleUrls: ['./muder-nav-menu.component.css'],
})
export class MuderNavMenuComponent implements OnInit {
  public isAuthenticated: Observable<boolean>;
  public isAdmin: Observable<boolean>;

  constructor(private authorizeService: AuthorizeService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.isAdmin = this.authorizeService.isAdmin();
  }
}
