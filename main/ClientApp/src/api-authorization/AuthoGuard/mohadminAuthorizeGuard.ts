import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizeService } from '../authorize.service';

@Injectable({
  providedIn: 'root',
})
export class mohadminAuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorize
      .ismohandadmin()
      .pipe(
        tap((isAuthenticated) =>
          this.handleAuthorization(isAuthenticated, state)
        )
      );
  }

  private handleAuthorization(
    isAuthenticated: boolean,
    state: RouterStateSnapshot
  ) {
    if (!isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }
}
