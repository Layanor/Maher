import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, timer } from 'rxjs';
import { HttpdataService } from '../../../app/service/httpdata.service';
import {
  MedicalCenter,
  Users,
  hf,
  EditUsers,
  CompTypes,
} from '../../../app/classes/mod';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';

import { User } from 'oidc-client';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
//   {
//   providedIn: 'root'
// }
export class UsersService {
  private _listners = new BehaviorSubject<string>(null);

  // public usersModels: UsersModel[]

  constructor(
    private ns: NotificationsService,
    // private Activatedrouter: ActivatedRoute, private notificationsService: NotificationsService,
    private dataService: HttpdataService
  ) {}

  private handleError(error: HttpErrorResponse) {
    console.error('errr:', error);
    const errormessage = error.message;
    if (error.status === 401) {
      this.ns.error(errormessage);
      //  console.log();
    }

    if (error.error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error?.error?.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(errormessage);
  }

  public listen(): Observable<string> {
    return this._listners.asObservable();
  }
  public filter(args: any) {
    this._listners.next(args);
  }

  public emailused(): AsyncValidatorFn {
    return ((
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      if (!control.value) {
        return null;
      } else {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const result: boolean = expression.test(control.value); // true
        if (result) {
          return timer(1000).pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap((email) =>
              this.dataService
                .postget('api/HospUserAdmin/email/' + control.value)
                .pipe(
                  map((res) => {
                    //  console.log(res);
                    if (res === 'used') {
                      return { used: {} };
                    } else if (res === 'badmohmail') {
                      return { badmohmail: {} };
                    } else if (res === null) {
                      return null;
                    }
                  })
                )
            )
          );
        } else {
          return null;
        }
      }
    }) as any;
  }



  public getallclass(): Observable<hf[]> {
    const URL = 'api/HospUserAdmin/classList';
    return this.dataService.postget<hf[]>(URL);
  }
  public getalledu(): Observable<hf[]> {
    const URL = 'api/HospUserAdmin/eduList';
    return this.dataService.postget<hf[]>(URL);
  }
  public getselecteduser(id: string): Observable<EditUsers> {
    const URL = 'api/HospUserAdmin/user/' + id;
    return this.dataService.postget<EditUsers>(URL);
  }
  //    public getallrole(): Observable<Roles[]> {
  //      const URL = `${this.roledUrl}`;
  //      return this.dataService.get<Roles[]>(URL);
  //    }

  //    public get user(): IProfileModel | undefined {
  //      return this.accountService.user;
  //    }

  //    public usernameused(): AsyncValidatorFn {
  //      return ((
  //        control: AbstractControl
  //      ):
  //        | Promise<{ [key: string]: any } | null>
  //        | Observable<{ [key: string]: any } | null> => {
  //        if (!control.value) {
  //          return observableOf(null);
  //        }  else {
  //          return this.dataService.post("api/md/mdnumber/" + control.value).pipe(
  //            map(res => {
  //              return res ? { existingDate: {} } : null;
  //            })
  //          );
  //        }
  //      }) as any;
  //    }

  //    public getallusers(): Observable<Users[]> {
  //      const URL = `${this.userUrl}`;
  //      return this.dataService.get<Users[]>(URL);
  //    }

  //    /*  public getmdbyid(id: number): Observable<Roles> {
  //      const URL = `${this.Url}/${id}`;
  //      return this.dataService.get<Roles>(URL)
  //      .pipe(
  //     map(data => <Roles>
  //    {
  //      //تحويل البيانات القادمة من السيرغر الى بيانات خاصة بالكلي ينت
  //      usersCount: data.usersCount,
  //      description: data.description,
  //      name: data.name,
  //      id: any.id,
  //    } ) );
  //    } */

  public add(data: User): Observable<User> {
    const CreateURL = `api/HospUserAdmin/Insert/`;
    if (data) {
      return this.dataService.post<User>(CreateURL, data);
      // .pipe(
      // catchError(this.handleError) );
    }
  }

  public put(data?: Users, id?: string): Observable<Users> {
    const URL = `api/HospUserAdmin/putuser/${id}`;
    if (data) {
      return this.dataService.put<Users>(URL, data);
    }
  }
  public del(id?: string): Observable<Users> {
    const URL = `api/HospUserAdmin/deluser/${id}`;
    if (id) {
      return this.dataService.delete<Users>(URL);
    }
  }

  //    public put(data?: Users , id?: string): Observable<Users> {
  //      const URL = `${this.updateuserUrl}/${id}`;
  //      if (data) {
  //       return this.dataService.put<Users>(URL, data );
  //      }
  //  }

  //  public delet(data?: Users): Observable<Users> {
  //    const URL = `${this.userUrl}/${data.id}`;
  //    if (data) {
  //      return this.dataService.delete<Users>(URL );
  //    }
  // }
}
