import { MedicalcenterandType } from '../../classes/mod';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve,
  Router,
} from '@angular/router';
import { Observable, zip } from 'rxjs';
import { HttpdataService } from '../../service/httpdata.service';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Injectable()
export class MdResolver implements Resolve<MedicalcenterandType> {
  constructor(private dataService: HttpdataService,
    private authorize: AuthorizeService,
    private router: Router,) { }
  public Url = 'api/MedicalCenters';

  public authtoken: any = null;
  public data: any = null;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<MedicalcenterandType>
    | Promise<MedicalcenterandType>
    | MedicalcenterandType {
    this.authtoken = this.authorize.getAccessToken();
    this.data = this.dataService.postget(this.Url);
    
    if (this.data && this.authtoken) {
     
      return zip(this.data, this.authtoken);
    } else {
      this.router.navigate(['/']);
      return new Observable(null);
    }

  }
}
