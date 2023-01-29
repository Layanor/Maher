import { HttpdataService } from './../../service/httpdata.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
} from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Injectable()
export class ClassroomResolver implements Resolve<any> {
  constructor(
    private dataService: HttpdataService
  ) //  private authorize: AuthorizeService
  {}

  public Url = 'api/classroom';

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    // this.authorize.getAccessToken().subscribe((aut) => {
    //   console.log(aut);
    // });

    const data = this.dataService.postget(this.Url);
    return combineLatest([data]);
  }
}
