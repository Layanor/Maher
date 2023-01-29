import { Injectable } from '@angular/core';
import { HttpdataService } from '../../service/httpdata.service';
import { MedicalcenterandType } from '../../classes/mod';
import { Observable } from 'rxjs';

@Injectable()
//   {
//   providedIn: 'root',
// }
export class MdService {
  constructor(private dataService: HttpdataService) {}

  public getall(url: string): Observable<MedicalcenterandType> {
    return this.dataService.postget(url);
  }
}
