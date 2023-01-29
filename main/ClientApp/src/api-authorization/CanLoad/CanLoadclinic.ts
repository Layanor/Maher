import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';

@Injectable()
export class CanLoadclinic implements CanLoad {
  constructor(private authorize: AuthorizeService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorize.isclinicuser().pipe(
      first(),
      tap((isAuthenticated) => this.handleAuthorization(isAuthenticated))
    );
  }
  private handleAuthorization(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }
}
