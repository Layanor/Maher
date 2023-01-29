import { Injectable } from '@angular/core';
import { HttpdataService } from '../../../app/service/httpdata.service';
import { Observable } from 'rxjs';
import { Directorate } from '../../../app/classes/mod';
@Injectable()
//   {
//   providedIn: 'root'
// }
export class DirService {
  constructor(private dataService: HttpdataService) {}
  public getall(url: string): Observable<Directorate[]> {
    return this.dataService.post(url);
  }
}
