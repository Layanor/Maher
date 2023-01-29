import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';
import { UsersService } from '../Users.service';
import { EditUsers } from '../../../../app/classes/mod';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-userdelete',
  templateUrl: './userdelete.component.html',
  styleUrls: ['./userdelete.component.css'],
})
export class UserdeleteComponent implements OnInit, OnDestroy {
  modalRef2: BsModalRef;
  public xsrf: string;
  public authtoken: string;
  public fullname: string = null;
  public email: string = null;
  public allmd: string[] = [];
  public allcl: string[] = [];
  public allistmara: string[] = [];
  public allusertype: string[] = [];
  public comptype: string[] = [];
  private sub: Subscription;
  selecteduserid: string;
  selecteduser: EditUsers;

  constructor(
    public bsModalRef: BsModalRef,
    private ns: NotificationsService,
    private authorize: AuthorizeService,
    private modalService: BsModalService,
    private userservice: UsersService
  ) {}

  ngOnInit() {
    if (this.xsrf === undefined || this.xsrf === '') {
      const name = 'XSRF-TOKEN' + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          this.xsrf = c.substring(name.length, c.length);
        }
      }
    }
    if (this.authtoken === undefined || this.authtoken === '') {
      this.sub = this.authorize
        .getAccessToken()
        .pipe(
          map((token) => {
            if (token != null) {
              this.authtoken = token;
            }
          })
        )
        .subscribe();
    }
    setTimeout(() => {
      this.selecteduserid = this.bsModalRef.content.selecteduserid;
      //  console.log(this.bsModalRef.content.selecteduserid)
      this.getselecteduser(this.selecteduserid);
    }, 500);
  }
  getselecteduser(id: string): void {
    this.userservice.getselecteduser(id).subscribe(
      (user) => {
        this.selecteduser = user;
        //  console.log(this.selecteduser);
        if (user != null) {
          this.fullname = user.FullName;
          this.email = JSON.stringify(user.Email);

          if (user.cilinic.length > 0) {
            this.allcl = user.cilinic.map(function (item, index) {
              if (item.value !== 0) {
                return item.text;
              } else {
                return 'لا يشرف على اي مراكز ';
              }
            });
          } else {
            this.allcl.push('لا يشرف على اي مراكز ');
          }
          if (user.md.length > 0) {
            this.allmd = user.md.map(function (item, index) {
              if (item.value !== 0) {
                return item.text;
              } else {
                return 'لا يشرف على اي مستشفيات  ';
              }
            });
          } else {
            this.allmd.push('لا يشرف على اي مستشفيات  ');
          }
          if (user.usertype.length > 0) {
            this.allusertype = user.usertype.map(function (item, index) {
              // console.log(item);
              if (item.value !== 0) {
                return item.text;
              } else {
                return 'ليس لديه اي صلاحية     ';
              }
            });
          } else {
            this.allusertype.push('ليس لديه اي صلاحية  ');
          }

          // this.allistmara = user.istmara.map(function (item, index) {
          //   //  console.log(item);
          //   if (item.value !== 0) {
          //     return item.text;
          //   } else {
          //     return 'لا يشرف على اي استمارة ';
          //   }
          // });
          if (user.usercomptype.length > 0) {
            this.comptype = user.usercomptype.map(function (item, index) {
              //  console.log(item);
              if (item.value !== 0) {
                return item.text;
              } else {
                return 'لا يشرف على اي بلاغ ';
              }
            });
          } else {
            this.comptype.push('لا يشرف على اي بلاغ');
          }
        }
      },
      (err) => {
        this.ns.error(
          '`لم يتم الاتصال بالسرفر الرجاء تحديث الصفحة ',
          err.error.Message
        );
      }
    );
  }
  public del(): void {
    this.userservice.del(this.selecteduser.Id).subscribe(
      () => {
        this.ns.success(`The User was successfully Deleted`);
        this.ns.success(`تم حذف المستخدم بنجاح`);
        this.userservice.filter('args');
        this.bsModalRef.hide();
      },
      (err: any) => {
        this.ns.error('لم يتم حذف المستخدم', err.error['message']);
        this.userservice.filter('args');
        this.bsModalRef.hide();
      }
    );
  }
  public canceladd(event) {
    event.preventDefault();

    this.ns.info(`تم الغاء العملية من قبلك ولم يتم حذف أي  بيانات`);
    this.bsModalRef.hide();
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
