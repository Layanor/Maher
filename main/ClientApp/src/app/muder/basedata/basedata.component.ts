import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
} from '@angular/core';
import {
  CommandModel,
  SearchSettingsModel,
  EditSettingsModel,
} from '@syncfusion/ej2-angular-grids';
import { Title } from '@angular/platform-browser';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-basedata',
  templateUrl: './basedata.component.html',
  styleUrls: ['./basedata.component.css'],
})
export class BasedataComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() url: string;
  @Input() titel: string;
  @Input() modelename: string;
  @Input() Datasourse: any;

  constructor(
    private titleService: Title,
    private authorize: AuthorizeService
  ) {}
  public nameRules: object;
  public ValueRules: object;
  public ndata: any = null;
  public columns: object[];
  public sub: Subscription;
  public commands: CommandModel[];
  public searchOptions: SearchSettingsModel;
  public editSettings: EditSettingsModel;
  ngOnInit(): void {
    this.titleService.setTitle(this.titel);
    this.sub = this.authorize.getAccessToken().subscribe((aut) => {
      this.ndata = [{ result: this.Datasourse }, aut];
    });

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
    };
    this.searchOptions = { fields: ['name'] };
    this.commands = [
      {
        type: 'Edit',
        buttonOption: {
          content: 'تعديل',
          cssClass: 'e-flat',
          iconCss: 'e-edit e-icons',
        },
      },
      {
        type: 'Delete',
        buttonOption: {
          content: 'حذف',
          cssClass: 'e-flat',
          iconCss: 'e-delete e-icons',
        },
      },
      {
        type: 'Save',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' },
      },
      {
        type: 'Cancel',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' },
      },
      // { title: "Details", buttonOption: { content: 'Detailssss', cssClass: 'e-flat', } }
    ];

    this.nameRules = {
      required: [
        this.requiredvalidateRules,
        ' الرجاء كتابة   ' + this.modelename,
      ],
      minLength: [
        this.minLengthvalidateRules,
        this.modelename + '  لا يقل عن 3 حروف ولا  يزيد عن 250 حرف',
      ],
    };
    this.ValueRules = {
      required: [
        this.requiredNumbervalidateRules,
        ' الرجاء كتابة رقم الاستمارة ارقام فقط اكبر من 0 واقل من 100 ',
      ],
      // notuse: [
      //    this.numbernotuse,
      //   'رقم الاستمارة مستخدم سابقا الرجاء استخدام رقم اخر',
      //  ],
    };
    
    this.columns = [
      {
        field: 'Id',
        allowFiltering: false,
        visible: false,
        allowGrouping: false,
        showColumnMenu: false,
        minWidth: '5%',
        width: '5%',
        type: 'number',
        maxWidth: '5%',
        headerText: 'ID',
        textAlign: 'center',
        isPrimaryKey: true,
        lockColumn: true,
        allowEditing: false,
        allowSearching: false,
        isIdentity: true,
      },
      {
        field: 'Name',
        allowFiltering: true,
        headerText: this.modelename,
        allowGrouping: false,
        allowSorting: true,
        showColumnMenu: false,
        validationRules: this.nameRules,
        minWidth: '25%',
        width: '25%',
        maxWidth: '25%',
        textAlign: 'center',
      },
    ];

    if (this.Datasourse[0]?.hasOwnProperty('MohExcelName')) {
      this.columns.push({
        field: 'MohExcelName',
        visible: true,
        allowGrouping: false,
        showColumnMenu: false,
        headerText: 'الاسم كما في ملف الاكسل',
        textAlign: 'center',
        isPrimaryKey: false,
        allowEditing: true,
        allowSearching: true,
        isIdentity: false,
        allowFiltering: true,
      });
    }
    if (this.Datasourse[0]?.hasOwnProperty('value')) {
      this.columns.push({
        allowFiltering: false,
        field: 'value',
        headerText: 'الرقم',
        allowGrouping: false,
        allowSorting: true,
        showColumnMenu: false,
        validationRules: this.ValueRules,
        minWidth: '25%',
        width: '25%',
        maxWidth: '25%',
        textAlign: 'center',
      });
    }
     this.columns.push({
       field: 'jobs',
       headerText: 'المهام',
       minWidth: '15%',
       width: '15%',
       textAlign: 'center',
       commands: this.commands,
       allowEditing: false,
       allowFiltering: false,
       allowSorting: false,
       allowSearching: false,
       allowGrouping: false,
       showColumnMenu: false,
     });
  }
  public minLengthvalidateRules: (args: { [key: string]: string }) => boolean =
    (args: { [key: string]: string }) => {
      return args['value'].length >= 3 && args['value'].length <= 250;
    };
  public requiredvalidateRules: (args: { [key: string]: string }) => boolean =
    (args: { [key: string]: string }) => {
      return args['value'].length > 0;
    };
  public requiredNumbervalidateRules: (args: {
    [key: number]: number;
  }) => boolean = (args: { [key: number]: number }) => {
    return +args['value'] > 0 && +args['value'] < 100;
  };
  ngAfterViewInit(): void {
    // if (this.grid !== undefined && this.grid !== null) {
    //   this.grid.dataBound = this.dataBound;
    //   this.grid.rowDataBound = this.rowDataBound;
    //   this.grid.actionbegin = this.actionbegin;
    //   this.grid.actionComplete = this.actionComplete;
    // }
  }
  // dataBound(args: any) {
  //   if (this.grid !== undefined && this.grid !== null) {
  //     Object.assign((this.grid.filterModule as any).filterOperators, {
  //       startsWith: 'contains',
  //     });
  //     (this.grid.columns[0] as any).isPrimaryKey = 'true';
  //     // or
  //     const column: ColumnModel = this.grid.getColumnByField('id');
  //     column.isPrimaryKey = true;
  //     column.width = 3000;
  //   }
  // }
  // rowDataBound(args: RowDataBoundEventArgs) {
  //   // const open = 'isopen';
  //   // const x = args.row.getElementsByTagName('td')[1];
  //   // if (args.data[open] === true) {
  //   //   x.classList.add('isopen');
  //   //   // console.log(args.row.getElementsByTagName('td')[1]);
  //   //   // args.data[isopen] = ' المحجر نشط';
  //   //   // args.row.classList.add('isopen');
  //   // } else {
  //   //   x.classList.add('isclose');
  //   //   // args.data[isopen] = ' المحجر مغلق';
  //   //   // args.row.classList.add('isclose');
  //   // }
  //   // const Freight = 'Freight';
  //   // if (args.data[Freight] < 30) {
  //   //   args.row.classList.add('below-30');
  //   // } else if (args.data[Freight] < 80) {
  //   //   args.row.classList.add('below-80');
  //   // } else {
  //   //   args.row.classList.add('above-80');
  //   // }
  // }
  // actionbegin(args: any): void {
  //   console.log(this.modelename);

  //   //  console.log('mahactionbegin', args.requestType);
  //   // if (args.requestType === 'beginEdit') {
  //   //   // console.log('mahactionbegin', this.grid.columns);
  //   //   for (const cols of this.grid.columns) {
  //   //     if ((cols as Column).field === 'number') {
  //   //       (cols as Column).visible = false;
  //   //     }
  //   //   }
  //   // }
  // }

  // actionComplete(args: any): void {
  //   console.log(this.modelename);

  //   const dialog = args.dialog;
  //   dialog.header =
  //     args.requestType === 'beginEdit'
  //       ? ' تعديل بيانات  ' + this.modelename
  //       : 'اضافة ' + this.modelename;
  //   dialog.buttons[0].buttonModel.cssClass = 'e-success';
  //   // if (args.requestType === 'beginEdit' || args.requestType === 'add') {
  //   //   const dialog = args.dialog;
  //   //   dialog.header =
  //   //     args.requestType === 'beginEdit'
  //   //       ? this.modelename + '  تعديل بيانات   '
  //   //       : this.modelename + 'أضافة   ';
  //   //   // dialog.buttons[0].buttonModel.cssClass = 'e-success'
  //   // }
  //   // for (const cols of this.grid.columns) {
  //   //   if ((cols as Column).field === 'number') {
  //   //     (cols as Column).visible = true;
  //   //   }
  //   // }
  //   // if (args.requestType === 'beginEdit' || args.requestType === 'add') {
  //   //   const dialog = args.dialog;
  //   //   dialog.header =
  //   //     args.requestType === 'beginEdit'
  //   //       ? '  تعديل بيانات المحجر  '
  //   //       : 'أضافة محجر جديد ';
  //   //   // dialog.buttons[0].buttonModel.cssClass = 'e-success'
  //   // }
  //   // this.grid.element.classList.remove('disablegrid');
  //   // document.getElementById("GridParent").classList.remove('wrapper');
  // }
  // numbernotuse(args) {
  // console.log(this.Datasourse);
  // const x = this.data.some((v) => v.value === +args['value']);
  // console.log(x);
  // return x;
  // return +args['value'] === 5.0;
  // return (control: AbstractControl) => {
  // return timer(500).pipe(() => {
  //   console.log('dfdfd' + args['value']);
  //   if (!+args['value']) {
  //     return of(null);
  //   }
  //   const x = this.http
  //     .post<any>('api/Istmaras/numbernotused/' + args['value'], null)
  //     .pipe(
  //       map((res) => {
  //         console.log(res);
  //         return res ? { numberused: true } : null;
  //       })
  //     );
  // });
  // };
  // }

  // public emailused(): AsyncValidatorFn {
  //   return ((
  //     control: AbstractControl
  //   ):
  //     | Promise<{ [key: string]: any } | null>
  //     | Observable<{ [key: string]: any } | null> => {
  //     if (!control.value) {
  //       return null;
  //     } else {
  //       return this.dataService
  //         .postget('api/HospUserAdmin/email/' + control.value)
  //         .pipe(
  //           map((res) => {
  //             return res ? { existingDate: {} } : null;
  //           })
  //         );
  //     }
  //   }) as any;
  // }

  // public numbernotuse2(): (args: { [key: number]: number }) => boolean = (args: {
  //   [key: number]: number;
  // }) => {
  //   // return +args['value'] === 5.0;
  //   return this.dataService
  //     .postget('api/HospUserAdmin/email/' + +args['value'])
  //     .pipe(
  //       map((res) => {
  //         return res ? { existingDate: {} } : null;
  //       })
  //     );
  // };

  // public mohemailvalidateRules: (args: {
  //   [key: string]: string;
  // }) => boolean = (args: { [key: string]: string }) => {
  //   // var regex = "^[a-zA-Z0-9._%+-]+(@moh.gov.sa|@hcic.info)$";
  //   // var regex = /[a-zA-Z0-9._]+(@moh.gov.sa|@hcic.info)/igm;
  //   // var regex = /^\w+([\.-]?\w+)*@\moh.gov.sa+$/;
  //   const regex = /^\w+([\.-]?\w+)*(@moh.gov.sa|@qps.life)$/;
  //   return regex.test(args[this.value]);
  // };
  ngOnDestroy(): void {
    if (this.sub) {
      //  console.log(this.sub)
      this.sub.unsubscribe();
    }
    //if (this.routeSub2) {
    //  //  console.log(this.sub)
    //  this.routeSub2.unsubscribe();
    //}
  }
}
