import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';
import { AuthorizeService } from '../authorize.service';

@Injectable({
  providedIn: 'root',
})
export class CallsDirAuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorize
      .isCalldiruser()
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
