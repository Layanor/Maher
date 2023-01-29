import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthorizeService } from '../authorize.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HospAuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorize
      .ishospuser()
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
