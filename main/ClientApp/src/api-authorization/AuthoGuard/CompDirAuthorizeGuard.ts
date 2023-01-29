import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { tap, map, retry } from 'rxjs/operators';
import { AuthorizeService } from '../authorize.service';

@Injectable({
  providedIn: 'root',
})
export class CompsDirAuthorizeGuard implements CanActivate {
  constructor(private authorize: AuthorizeService, private router: Router) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const ct = _next.params['id'];
    if (isNaN(+ct)) {
      console.log(`الرجاء التاكد من : ${ct}`);
      this.router.navigate(['/all']);
      return new Observable(null);
    }
    if (+ct !== null && +ct !== 0) {
      return this.authorize.getUser().pipe(
        map((u) => !!u && u?.usercomptype?.some((x) => x.value === +ct)),
        tap((isAuthenticated) =>
          this.handleAuthorization(isAuthenticated, state)
        )
      );
    } else {
      this.router.navigate(['/all']);
      return new Observable(null);
    }
  }

  private handleAuthorization(
    isAuthenticated: boolean,
    state: RouterStateSnapshot
  ) {
    if (!isAuthenticated) {
      this.router.navigateByUrl('/all');
    }
  }
}
