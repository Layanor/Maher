import {
  Component,
  OnInit,
  TemplateRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import {
  Users,
  MedicalCenter,
  Roles,
  hf,
  CompTypes,
} from '../../../../app/classes/mod';
import { NotificationsService } from 'angular2-notifications';
import {
  HttpClient,
  HttpXsrfTokenExtractor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthorizeService } from '../../../../api-authorization/authorize.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { compareValidator } from '../../../../app/classes/compare-validator.directive';
import { UsersService } from '../Users.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import {
  DateType,
  HijriGregorianDatepickerComponent,
} from 'ngx-hijri-gregorian-datepicker';

@Component({
  selector: 'app-usersadd',
  templateUrl: './usersadd.component.html',
  styleUrls: ['./usersadd.component.css'],
})
export class UsersaddComponent implements OnInit, OnDestroy {
  dateString: string;
  selectedDateType = DateType.Gregorian;
  @ViewChild('interdate') interdate: HijriGregorianDatepickerComponent;
  modalRef2: BsModalRef;
  Form: UntypedFormGroup;
  data: Users = new Users();
  allclass: any[] = [];
  alledue: any[] = [];

  EnterDateTime: NgbDateStruct;
  usertype: { text: string; value: number }[];

  public viewhosp = false;
  public viewclinic = false;
  public viewusertype = false;
  public xsrf: string;
  public authtoken: string;
  private sub: Subscription;
  public id = 0;
  constructor(
    private dateFormatterService: DateFormatterService,
    public bsModalRef: BsModalRef,
    private fb: UntypedFormBuilder,
    private ns: NotificationsService,
    public http: HttpClient,
    private authorize: AuthorizeService,

    private modalService: BsModalService,
    private userservice: UsersService
  ) {}
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
  }
  ngOnInit() {
    this.EnterDateTime = this.dateFormatterService.GetTodayGregorian();

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
      this.id = this.bsModalRef.content.id;
      console.log(this.bsModalRef.content.id);
    }, 500);
    this.getallclass();
    this.getalledu();

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

      email: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
        [this.userservice.emailused()],
      ],
      EnterDateTime: [
        this.EnterDateTime,
        Validators.compose([Validators.required]),
      ],
      IdNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],
      UserPhone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],

      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
          ),
        ],
      ],
      ConfirmPassword: [
        '',
        [
          Validators.minLength(3),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
          ),
          Validators.required,
          compareValidator('Password'),
          Validators.maxLength(100),
        ],
      ],

      Roles: [
        '',
        [
          //  Validators.required,
        ],
      ],
      Usersclassrooms: [
        '',
        [
          //   Validators.required,
        ],
      ],
      usersedumaterials: [
        '',
        [
          //   Validators.required,
        ],
      ],
    });
  }
  onDateSelect(e) {
    this.EnterDateTime = e;
    this.Form.controls['EnterDateTime'].setValue(e);
    this.interdate.selectedDate = this.EnterDateTime;
  }
  getallclass() {
    this.userservice.getallclass().subscribe(
      (mdfromdb) => {
        this.allclass = mdfromdb;
      },
      (err) => {
        this.ns.error(
          'لم يتم تحديث قائمة  الفصول الدراسية الرجاء تحديث الصفحة ',
          err.error.Message
        );
      }
    );
  }
  getalledu() {
    this.userservice.getalledu().subscribe(
      (mdfromdb) => {
        this.alledue = mdfromdb;
      },
      (err) => {
        this.ns.error(
          'لم يتم تحديث قائمة المواد التعليمية  الرجاء تحديث الصفحة ',
          err.error.Message
        );
      }
    );
  }

  public add(): void {
    console.log(this.Form.value)
    // const ist: number[] = new Array();
    // ist.push(1);
    // this.Form.setControl('istmara', new UntypedFormControl('istmara'));
    // this.Form.controls['istmara'].setValue(ist);


    // const ut: number[] = new Array();
    // const uts = this.Form.get('usertype').value;

    // if (uts === null) {
    //   this.Form.controls['usertype'].setValue([]);
    // }


    // switch (+uts) {
    //   case 0:
    //     this.ns.error(`يرجى أختيار صلاحيات المستخدم `);
    //     return;
    //     break;

    //   case undefined:
    //     this.ns.error(`يرجى أختيار صلاحيات المستخدم `);
    //     return;
    //     break;
    //   case null:
    //     this.ns.error(`يرجى أختيار صلاحيات المستخدم `);
    //     return;
    //     break;
    //   case 1:
    //     const md: number[] = this.Form.get('medicalcenters').value;
    //     if (md.length == 0) {
    //       this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
    //       return;
    //     }
    //     break;
    //   case 2:
    //     const cl: number[] = this.Form.get('clinic').value;
    //     if (cl.length == 0) {
    //       this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
    //       return;
    //     }
    //     break;
    //   case 3:
    //     const mdd: number[] = this.Form.get('medicalcenters').value;
    //     if (mdd.length == 0) {
    //       this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
    //       return;
    //     }
    //     const cll: number[] = this.Form.get('clinic').value;
    //     if (cll.length == 0) {
    //       this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
    //       return;
    //     }
    //     break;
    //   case 4:
    //     const mddd: number[] = this.Form.get('medicalcenters').value;
    //     if (mddd.length == 0) {
    //       this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
    //       return;
    //     }
    //     break;
    //   case 5:
    //     const clll: number[] = this.Form.get('clinic').value;
    //     if (clll.length == 0) {
    //       this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
    //       return;
    //     }
    //     break;
    //   case 6:
    //     const mdda: number[] = this.Form.get('medicalcenters').value;
    //     if (mdda.length == 0) {
    //       this.ns.error(`يرجى أختيار  مستشفى واحد على الاقل `);
    //       return;
    //     }
    //     const clla: number[] = this.Form.get('clinic').value;
    //     if (clla.length == 0) {
    //       this.ns.error(`يرجى أختيار  مركز صحي واحد على الاقل `);
    //       return;
    //     }
    //     break;
    //   default:
    //     break;
    // }
    // this.userservice.add(this.Form.value).subscribe(
    //   () => {
    //     this.ns.success(`تم أضافة المستخدم بنجاح`);
    //     this.Form.reset();
    //     this.bsModalRef.hide();
    //     this.userservice.filter('args');
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.bsModalRef.hide();
    //     this.Form.reset();
    //     this.ns.error(`لم يتم أضافة  المستخدم  `, error?.error?.message);
    //   }
    // );

  }
  public canceladd(event) {
    event.preventDefault();
    this.Form.reset();
    this.ns.info(`تم الغاء العملية من قبلك ولم يتم أضافة أي  بيانات`);
    this.bsModalRef.hide();
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // getalistmara() {
  //   this.userservice.getalistmara().subscribe(
  //     (mdfromdb) => {
  //       this.istmara = mdfromdb;
  //       // console.log(mdfromdb)
  //     },
  //     (err) => {
  //       this.ns.error(
  //         '`لم يتم تحديث قائمة  الاستمارات الرجاء تحديث الصفحة ',
  //         err.error.Message
  //       );
  //     }
  //   );
  // }
  // istmaraaded(i) {
  //   // console.log(i);
  // }

  //istmarachang(i: []) {
  //  if (i.length === 0) {
  //    this.viewusertype = false;
  //    this.viewclinic = false;
  //    this.viewhosp = false;
  //  }

  //  i.forEach((f) => {
  //    if (Object.values(f)[0] === 1) {
  //      this.filterusertype = [];
  //      this.usertype.forEach((c) => {
  //        if (
  //          c.value === 1 ||
  //          c.value === 2 ||
  //          c.value === 3 ||
  //          c.value === 9 ||
  //          c.value === 99
  //        ) {
  //          this.filterusertype.push(c);
  //        }
  //      });
  //      this.viewusertype = true;
  //      this.viewclinic = false;
  //      this.viewhosp = false;
  //    }
  //    // if (Object.values(f)[0] === 1) {
  //    //   this.filterusertype = [];
  //    //   this.usertype.forEach((c) => {
  //    //     if (
  //    //       c.value !== 6 &&
  //    //       c.value !== 66 &&
  //    //       c.value !== 666 &&
  //    //       c.value !== 6666
  //    //     ) {
  //    //       this.filterusertype.push(c);
  //    //     }
  //    //   });
  //    //   this.viewusertype = true;
  //    //   this.viewclinic = false;
  //    //   this.viewhosp = true;
  //    // }

  //    // console.log(Object.values(f)[0]);
  //  });
  //  //  Object.values(i);
  //  //  var n = i.some((v) => v.value);

  //  // console.log(Object.keys(i));
  //}

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

  // usertypeaded(i) {
  //   // console.log(i);
  // }
  //  console.log(i.value);
  //   i.forEach((f) => {
  //  console.log(f);
  // if (Object.values(f)[0] === 9 || Object.values(f)[0] === 99) {
  //   this.viewclinic = false;
  //   this.viewhosp = false;
  // }
}
