import { UsersModel } from '../../classes/mod';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpdataService } from '../../service/httpdata.service';
import { Router } from '@angular/router';

@Injectable()
export class HospUsersResolver implements Resolve<UsersModel> {
  constructor(private dataService: HttpdataService, private router: Router) {}

  public Url = 'api/hospUserAdmin/listuser/';

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UsersModel> | Promise<UsersModel> | UsersModel {
    const id = route.paramMap.get('id');

    if (id != undefined || id != null) {

      if ([1,2,3].includes(Number(id))) {
        const fullurl = this.Url + id;
        return this.dataService.postget(fullurl);
      } else {
        this.router.navigate(['/']);
        return new Observable();
      }
    } else {
      this.router.navigate(['/']);
      return new Observable();
    }
  }
}
