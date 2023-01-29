import {
  Component,
  OnInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { CompTypes, EditUsers, hf } from '../../../../app/classes/mod';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../Users.service';
import { compareValidator } from '../../../../app/classes/compare-validator.directive';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-useredite',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UsereditComponent implements OnInit, OnDestroy {
  modalRef2: BsModalRef;
  public isChangePassword = false;
  Form: UntypedFormGroup;
  selecteduserid: string;
  selecteduser: EditUsers;
  medicalcenters: hf[] = [];
  clinics: hf[] = [];
  istmara: { text: string; value: number }[];
  usertype: { text: string; value: number }[];
  utid: number[] = new Array();
  isid: number[] = new Array();
  mdid: number[] = new Array();
  clid: number[] = new Array();
  compt: number[] = new Array();
  comptype: CompTypes[] = [];
  public xsrf: string;
  public authtoken: string;
  private sub: Subscription;
  public viewhosp = false;
  public viewclinic = false;
  public viewusertype = false;
  public viewucomptype = false;
  filterusertype: { text: string; value: number }[] = [];
  constructor(
    public bsModalRef: BsModalRef,
    private fb: UntypedFormBuilder,
    private ns: NotificationsService,
    public http: HttpClient,
    private authorize: AuthorizeService,

    private userservice: UsersService
  ) {}
  // openModal2(template: TemplateRef<any>) {
  //   this.modalRef2 = this.modalService.show(template, { class: 'second' });
  // }
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

    this.Form = this.fb.group({
      FullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(
            '[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z ]*'
          ),
        ],
      ],

      Email: [
        '',
        [
          // Validators.required,
          // Validators.minLength(6),
          // Validators.maxLength(100),
          // Validators.pattern((/^\w+([\.-]?\w+)*(@moh.gov.sa|@qps.life)$/))
        ],
        // [this.userservice.emailused()]
      ],

      NewPassword: ['', []],
      ConfirmPassword: ['', []],
      // istmara: [
      //   '',
      //   [
      //     //   Validators.required,
      //   ],
      // ],
      usertype: [
        '',
        [
          //   Validators.required,
        ],
      ],
      medicalcenters: [
        '',
        [
          //   Validators.required,
        ],
      ],
      clinic: [
        '',
        [
          //   Validators.required,
        ],
      ],
      comptype: [
        '',
        [
          //   Validators.required,
        ],
      ],
      // recaptcha: ['', Validators.required]
    });
  }
  public changePassword() {
    this.isChangePassword = true;
    this.Form.get('NewPassword').setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
      ),
    ]);
    this.Form.get('ConfirmPassword').setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
      ),
      compareValidator('NewPassword'),
      Validators.maxLength(100),
    ]);
  }

  public unchangePassword() {
    this.isChangePassword = false;
    this.Form.get('NewPassword').reset();
    this.Form.get('ConfirmPassword').reset();
    this.Form.get('NewPassword').clearValidators();
    this.Form.get('ConfirmPassword').clearValidators();
    this.Form.get('NewPassword').updateValueAndValidity();
    this.Form.get('ConfirmPassword').updateValueAndValidity();
    this.Form.updateValueAndValidity();
  }

  
  getselecteduser(id: string): void {
    this.userservice.getselecteduser(id).subscribe({
      next: (user): EditUsers => {
        this.selecteduser = user;
        if (user != null) {
          this.viewclinic = true;
          this.viewhosp = true;
          this.viewucomptype = true;
          this.viewusertype = true;
          // this.mdid = this.selecteduser.md.map(function (item, index) {
          //   // console.log(item)
          //   if (item.value !== 0) {
          //     return item.value;
          //   } else {
          //     return 0;
          //   }
          // });
          this.clid = this.selecteduser.cilinic.map(function (item, index) {
            if (item.value !== 0) {
              return item.value;
            } else {
              return 0;
            }
          });
          this.mdid = this.selecteduser.md.map(function (item, index) {
            if (item.value !== 0) {
              return item.value;
            } else {
              return 0;
            }
          });
          // this.utid = this.selecteduser.usertype.map(function (item, index) {
          //   if (item.value !== 0) {
          //     return item.value;
          //   } else {
          //     return 0;
          //   }
          // });
          // this.isid = this.selecteduser.istmara.map(function (item, index) {
          //   if (item.value !== 0) {
          //     return item.value;
          //   } else {
          //     return 0;
          //   }
          // });
          this.compt = this.selecteduser.usercomptype.map(function (
            item,
            index
          ) {
            if (item.value !== 0) {
              return item.value;
            } else {
              return 0;
            }
          });
          // console.log('ccccc', this.clid)
          //  Object.assign(this.selecteduser, selecteduser);
          this.Form.patchValue({
            // id: this.selecteduser.id,
            FullName: this.selecteduser.FullName,
            Email: this.selecteduser.Email,
            // isEnabled: this.selecteduser.isEnabled,
            medicalcenters: this.mdid.some((item) => item !== 0)
              ? this.mdid
              : [],
            //this.selecteduser.md.length > 0
            //  ? this.selecteduser.md[0].value
            //  : [],
            // this.selecteduser.md.map(function (item, index) {
            //  //var fullname = 'the key=' + item.Id + ',and value=' + item.Name;
            //  return item.Id;
            // }),
            clinic: this.clid.some((item) => item !== 0) ? this.clid : [],
            usertype:
              this.selecteduser.usertype.length > 0
                ? this.selecteduser.usertype[0].value
                : [],
            //  istmara: this.isid.some((item) => item !== 0) ? this.isid : [],
            comptype: this.compt.some((item) => item !== 0) ? this.compt : [],
          });
          //  this.Form.get('email').disable();
          // this.Form.controls['email'].disable();
          //
          if (this.selecteduser.md.length === 0) {
            this.viewhosp = false;
          }
          if (this.selecteduser.cilinic.length === 0) {
            this.viewclinic = false;
          }
          return this.selecteduser;
        }
        return this.selecteduser;
      },
      error: (err) => {
        this.ns.error(
          '`لم يتم الاتصال بالسرفر الرجاء تحديث الصفحة ',
          err.error.Message
        );
      },
    });
  }
  usertypechang(i: any) {
    this.viewclinic = false;
    this.viewhosp = false;
    this.Form.controls['medicalcenters'].setValue([]);
    this.Form.controls['clinic'].setValue([]);
    //  console.log(i.value);
    //   i.forEach((f) => {
    //  console.log(f);
    // if (Object.values(f)[0] === 9 || Object.values(f)[0] === 99) {
    //   this.viewclinic = false;
    //   this.viewhosp = false;
    // }
    if (i !== undefined) {
      switch (i.value) {
        case 1:
          this.viewclinic = false;
          this.viewhosp = true;
          this.Form.controls['clinic'].setValue([]);
          break;
        case 2:
          this.viewclinic = true;
          this.viewhosp = false;
          this.Form.controls['medicalcenters'].setValue([]);
          break;
        case 3:
          this.viewclinic = true;
          this.viewhosp = true;
          this.Form.controls['medicalcenters'].setValue([]);
          this.Form.controls['clinic'].setValue([]);
          break;
        case 4:
          this.viewclinic = false;
          this.viewhosp = true;
          this.Form.controls['clinic'].setValue([]);
          break;
        case 5:
          this.viewclinic = true;
          this.viewhosp = false;
          this.Form.controls['medicalcenters'].setValue([]);
          break;
        case 6:
          this.viewclinic = true;
          this.viewhosp = true;
          this.Form.controls['medicalcenters'].setValue([]);
          this.Form.controls['clinic'].setValue([]);
          break;
        //case 3:
        //  console.log("It is a Wednesday.");
        //  break;
        default:
          this.viewclinic = false;
          this.viewhosp = false;
          this.Form.controls['medicalcenters'].setValue([]);
          this.Form.controls['clinic'].setValue([]);
          break;
      }
      //   });
    } else {
      this.viewclinic = false;
      this.viewhosp = false;
      this.Form.controls['medicalcenters'].setValue([]);
      this.Form.controls['clinic'].setValue([]);
    }
  }
  // public isformchached(): boolean {
  //  if (
  //    this.Form.controls["FullName"].value === this.selecteduser["FullName"]
  //    && this.Form.value.md === this.mdid
  //    //&&
  //    //this.Form.value.clinic === this.clid
  //    //&&
  //    //JSON.stringify(this.Form.controls["medicalcenters"].value) === JSON.stringify(this.selecteduser.md)
  //    //&&
  //    //this.Form.controls["NewPassword"].value === this.Form.controls["ConfirmPassword"].value &&
  //    //this.Form.controls["NewPassword"].value == null
  //  ) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  // }

  // public edituser(selecteduserid: string) {
  //   if (selecteduserid) {
  //     Object.assign(this.selecteduser, selecteduserid);
  //     this.Form.patchValue({
  //       id: this.selecteduser.id,
  //       FullName: this.selecteduser.fullname,
  //       email: this.selecteduser.email,
  //       isEnabled: this.selecteduser.isEnabled,
  //       medicalcenters: this.getselectedusermd(selecteduser1.username)
  //     });
  //     //  this.Form.get('email').disable();
  //     // this.Form.controls['email'].disable();
  //     //
  //     return this.selecteduser;
  //   }
  // }

  // getselectedusermd(mdname: string) {
  //   const selectedusermd = this.medicalcenters.find(
  //     x => x.text === mdname
  //   );

  //   return selectedusermd;
  // }
  public put(): void {
    this.Form.patchValue({
      Email: this.selecteduser.Email,
      Id: this.selecteduser.Id,
    });
    this.Form.controls['Email'].setValue(this.selecteduser.Email);
    const ist: number[] = new Array();
    ist.push(1);
    this.Form.setControl('istmara', new UntypedFormControl('istmara'));
    this.Form.controls['istmara'].setValue(ist);
    const uts = this.Form.get('usertype').value;

    switch (+uts) {
      case 0:
        this.ns.error(`يرجى أختيار صلاحيات المستخدم `);
        return;
        break;

      case undefined:
        this.ns.error(`يرجى أختيار صلاحيات المستخدم `);
        return;
        break;
      case null:
        this.ns.error(`يرجى أختيار صلاحيات المستخدم `);
        return;
        break;
      case 1:
        const md: number[] = this.Form.get('medicalcenters').value;
        if (md.length == 0) {
          this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
          return;
        }
        break;
      case 2:
        const cl: number[] = this.Form.get('clinic').value;
        if (cl.length == 0) {
          this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
          return;
        }
        break;
      case 3:
        const mdd: number[] = this.Form.get('medicalcenters').value;
        if (mdd.length == 0) {
          this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
          return;
        }
        const cll: number[] = this.Form.get('clinic').value;
        if (cll.length == 0) {
          this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
          return;
        }
        break;
      case 4:
        const mddd: number[] = this.Form.get('medicalcenters').value;
        if (mddd.length == 0) {
          this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
          return;
        }
        break;
      case 5:
        const clll: number[] = this.Form.get('clinic').value;
        if (clll.length == 0) {
          this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
          return;
        }
        break;
      case 6:
        const mdda: number[] = this.Form.get('medicalcenters').value;
        if (mdda.length == 0) {
          this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
          return;
        }
        const clla: number[] = this.Form.get('clinic').value;
        if (clla.length == 0) {
          this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
          return;
        }
        break;
      default:
        break;
    }

    this.userservice.put(this.Form.value, this.selecteduser.Id).subscribe(
      () => {
        this.ns.success(`The User was successfully Updated`);
        this.ns.success(`تم تحديث المستخدم بنجاح`);
        this.userservice.filter('args');
        this.bsModalRef.hide();
      },
      (err: any) => {
        this.ns.error('لم يتم تحديث المستخدم', err.error['message']);
        this.userservice.filter('args');
        this.bsModalRef.hide();
        this.Form.reset();
      }
    );
  }
  // getallroles() {
  //   this.userservice.getallrole().subscribe(
  //     rolefromdb => {
  //       this.roles = rolefromdb;

  //     },
  //     err => {
  //       this.ns.error("`لم يتم تحديث قائمةالصلاحيات الرجاء تحديث الصفحة ", err.error.Message);

  //     }
  //   );
  // }

  // public add(): void {

  //   this.userservice.add(this.Form.value).subscribe(
  //     () => {
  //       //this.ns.success(`The User was successfully added`);
  //       this.ns.success(`تم أضافة المستخدم بنجاح`);
  //       this.Form.reset();
  //       this.bsModalRef.hide();
  //       this.userservice.filter("args");
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.bsModalRef.hide();
  //       this.Form.reset
  //       //console.log(error?.error?.Message)

  //       //this.captchaElem.resetCaptcha();
  //       //this.ns.error(

  //       //  `The User was Not Added` + '""' + error?.error?.Message
  //       //);
  //       this.ns.error(
  //         `لم يتم أضافة  المستخدم  `, error?.error?.Message

  //       );
  //     },
  /*  () => {
     if (this.addchangesSavedCallback) this.addchangesSavedCallback();
   } */
  //  );
  // }
  public canceladd(event) {
    event.preventDefault();
    this.Form.reset();
    this.ns.info(`تم الغاء العملية من قبلك ولم يتم تعديل أي  بيانات`);
    this.bsModalRef.hide();
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
