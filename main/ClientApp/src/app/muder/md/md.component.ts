import { DataManager, Query } from '@syncfusion/ej2-data';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  CommandModel,
  SearchSettingsModel,
  EditSettingsModel,
  RowDataBoundEventArgs,
  Column,
  IEditCell,
  IFilterUI,
} from '@syncfusion/ej2-angular-grids';
import {
  MedicalcenterandType,
  MedicalCenter,
  MedCenterType,
} from '../../../app/classes/mod';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.css'],
})
export class MdComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('grid')
  public grid: any;
  public baseurl: string;
  public MedicalcenterandType: MedicalcenterandType;
  public mdcenter: MedicalCenter[];
  public mdtype: MedCenterType[];
  public xsrf: string;
  private sub: Subscription;
  public nameRules: object;
  public shortnameRules: object;
  public typeRules: object;
  public mohemailRules: object;
  public dirRules: object;
  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {
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

  }

  public url = 'api/MedicalCenters';
  public titel = ' قائمة بكافة   المنشأت الصحية';
  public modelename = '  منشأة صحية';
  public value = 'value';
  public Datasourse: any;
  public columns: object[];
  public commands: CommandModel[];
  public searchOptions: SearchSettingsModel;
  public editSettings: EditSettingsModel;
  public typeParams: IEditCell;
  public templateOptions: IFilterUI;
  ngOnInit(): void {
    this.titleService.setTitle(this.titel);
    this.activatedRoute.data.subscribe((d: any) => {

      var newdata = [{
        "result": d.MedicalcenterandType[0].result.MedicalCenterViewModels
      }
        , d.MedicalcenterandType[1]

      ]
      this.Datasourse = newdata;
      this.mdtype = d.MedicalcenterandType[0].result.MedCenterTypeViewModel;
    });
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
    ];
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
    };
    this.searchOptions = { fields: ['ShortName', 'Name', 'Email'] };
    this.nameRules = {
      required: [this.requiredvalidateRules, ' الرجاء كتابة اسم المستشفى '],
      minLength: [
        this.validateRules,
        'اسم المديرية لا يقل عن 3 حروف ولا  يزيد عن 250 حرف',
      ],
    };
    this.typeRules = {
      required: [this.requiredvalidateRules, ' الرجاء اختيار قطاع المستشفى '],
    };
    this.dirRules = {
      required: [this.requiredvalidateRules, ' الرجاء اختيار  المديرية '],
    };
    this.shortnameRules = {
      required: [
        this.requiredvalidateRules,
        ' الرجاء كتابة اسم المستشفى المختصر ',
      ],
      minLength: [
        this.validateRules,
        'اسم المديرية المختصر لا يقل عن 3 حروف ولا  يزيد عن 250 حرف',
      ],
    };
    this.mohemailRules = {
      required: [
        this.requiredvalidateRules,
        ' الرجاء كتابة بريد وزارة الصحة الالكتروني الخاص بالمستشفى ',
      ],
      minLength: [
        this.validateRules,
        'بريد وزارة الصحة الالكتروني الخاص بالمستشفى لا يقل عن 3 حروف ولا  يزيد عن 250 حرف',
      ],
      email: [
        this.mohemailvalidateRules,
        'الرجاء استخدام البريد الرسمي الخاص بوزارة الصحة السعودية - @moh.gov.sa ',
      ],
    };
    this.typeParams = {
      params: {
        allowFiltering: true,
        dataSource: new DataManager({
          json: this.mdtype,
        }),
        fields: { text: 'Name', value: 'MedCenterTypesId' },
        placeholder: 'الرجاء اختيار قطاع المستشفى',
        query: new Query(),
        // .where('id', 'equal', this.countryObj.value),
        actionComplete: () => true,
      },
    };
    this.templateOptions = {
      create: (args: { element: Element; column: Column }) => {
        const dd = document.createElement('select');
        dd.style.width = '100%';
        dd.style.border = 'none';
        dd.style.borderBottom = '2px';
        dd.style.borderBottom = 'solid';
        dd.style.borderBottomColor = 'darkgreen';

        dd.id = 'MedCenterTypesId';

        const dataSource: MedCenterType[] = [
          { Name: 'الجميع', MedCenterTypesId: 0 },
        ];
        const datas = dataSource.concat(this.mdtype);
        for (const value of datas) {
          const option: HTMLOptionElement = document.createElement('option');
          option.value = value.Name;
          option.innerHTML = value.Name;
          dd.appendChild(option);
        }
        return dd;
      },
      write: (args: { element: Element; column: Column }) => {
        args.element.addEventListener('input', (args1: Event): void => {
          const target: HTMLInputElement = args1.currentTarget as HTMLInputElement;

          if (target.value !== 'الجميع') {
            const value = target.value;
            this.grid.grid.filterByColumn(target.id, 'equal', value);
          } else {
            this.grid.grid.removeFilteredColsByField(target.id);
          }
        });
      },
    };

    this.columns = [
      {
        field: 'Id',
        visible: false,
        allowGrouping: false,
        showColumnMenu: false,

        type: 'number',

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
        visible: true,
        allowGrouping: false,
        showColumnMenu: false,
        headerText: 'المنشأة الصحية - الادارة ',
        textAlign: 'center',
        isPrimaryKey: false,
        allowEditing: true,
        validationRules: this.nameRules,
        allowSearching: true,
        isIdentity: false,
        allowFiltering: true,
      },
      {
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
      },
      {
        field: 'ShortName',
        visible: true,
        allowGrouping: false,
        showColumnMenu: false,
        headerText: '  الاسم المختصر',
        textAlign: 'center',
        isPrimaryKey: false,
        validationRules: this.shortnameRules,
        allowEditing: true,
        allowFiltering: true,
        allowSorting: false,
        allowSearching: true,

        isIdentity: false,
      },
      {
        field: 'Email',
        visible: true,
        allowGrouping: false,
        showColumnMenu: false,
        headerText: '  البريد الالكتروني',
        textAlign: 'center',
        isPrimaryKey: false,
        validationRules: this.mohemailRules,
        allowEditing: true,
        allowFiltering: true,
        allowSorting: false,
        allowSearching: true,

        isIdentity: false,
      },
      {
        field: 'MedCenterTypesId',
        filterBarTemplate: this.templateOptions,
        foreignKeyValue: 'Name',
        dataSource: this.mdtype,
        editType: 'dropdownedit',
        visible: true,
        validationRules: this.typeRules,
        allowGrouping: false,
        showColumnMenu: true,
        headerText: '  قطاع المستشفى',
        textAlign: 'center',
        isPrimaryKey: false,
        allowEditing: true,
        allowFiltering: true,
        allowSorting: true,
        allowSearching: true,
        edit: this.typeParams,
        isIdentity: false,
      },
      {
        field: 'usercount',
        visible: true,
        allowGrouping: false,
        showColumnMenu: false,

        headerText: ' عدد المستخدمين ',
        textAlign: 'center',
        isPrimaryKey: false,
        allowEditing: false,
        allowSearching: false,
        isIdentity: false,
        allowFiltering: false,
      },
      {
        field: 'jobs',
        headerText: 'المهام',
        textAlign: 'center',
        commands: this.commands,
        allowEditing: false,
        allowFiltering: false,
        allowSorting: false,
        allowSearching: false,
        allowGrouping: false,
        showColumnMenu: false,
      },
    ];
  }
  public validateRules: (args: { [key: string]: string }) => boolean = (args: {
    [key: string]: string;
  }) => {
    return args[this.value].length >= 3 && args[this.value].length <= 250;
  };
  public requiredvalidateRules: (args: {
    [key: string]: string;
  }) => boolean = (args: { [key: string]: string }) => {
    return args[this.value].length > 0;
  };
  public mohemailvalidateRules: (args: {
    [key: string]: string;
  }) => boolean = (args: { [key: string]: string }) => {
    const regex = /^\w+([\.-]?\w+)*(@moh.gov.sa|@qps.life)$/;
    return regex.test(args[this.value]);
  };
  ngAfterViewInit(): void {
    if (this.grid !== undefined && this.grid !== null) {
      // this.grid.dataBound = this.dataBound;
      // this.grid.rowDataBound = this.rowDataBound;
      // this.grid.actionbegin = this.actionbegin;
      // this.grid.actionComplete = this.actionComplete;
    }
  }
  dataBound(args: any) {
    // if (this.grid !== undefined && this.grid !== null) {
    //   Object.assign((this.grid.filterModule as any).filterOperators, {
    //     startsWith: 'contains',
    //   });
    //   (this.grid.columns[0] as any).isPrimaryKey = 'true';
    //   // or
    //   const column: ColumnModel = this.grid.getColumnByField('Id');
    //   column.isPrimaryKey = true;
    //   column.width = 3000;
    // }
  }
  rowDataBound(args: RowDataBoundEventArgs) {
    // const open = 'isopen';
    // const x = args.row.getElementsByTagName('td')[1];
    // if (args.data[open] === true) {
    //   x.classList.add('isopen');
    //   // console.log(args.row.getElementsByTagName('td')[1]);
    //   // args.data[isopen] = ' المحجر نشط';
    //   // args.row.classList.add('isopen');
    // } else {
    //   x.classList.add('isclose');
    //   // args.data[isopen] = ' المحجر مغلق';
    //   // args.row.classList.add('isclose');
    // }
    // const Freight = 'Freight';
    // if (args.data[Freight] < 30) {
    //   args.row.classList.add('below-30');
    // } else if (args.data[Freight] < 80) {
    //   args.row.classList.add('below-80');
    // } else {
    //   args.row.classList.add('above-80');
    // }
  }
  actionbegin(args: any): void {
    //  console.log('mahactionbegin', args.requestType);
    // if (args.requestType === 'beginEdit') {
    //   // console.log('mahactionbegin', this.grid.columns);
    //   for (const cols of this.grid.columns) {
    //     if ((cols as Column).field === 'number') {
    //       (cols as Column).visible = false;
    //     }
    //   }
    // }
  }

  actionComplete(args: any): void {
    if (
      args.requestType == 'filterafteropen' &&
      args.columnName == 'EnterDateTime'
    )
      args.filterModel.dlgObj.element.querySelector('.e-flm_optrdiv').hidden =
        true;
    // for (const cols of this.grid.columns) {
    //   if ((cols as Column).field === 'number') {
    //     (cols as Column).visible = true;
    //   }
    // }
    // if (args.requestType === 'beginEdit' || args.requestType === 'add') {
    //   const dialog = args.dialog;
    //   dialog.header =
    //     args.requestType === 'beginEdit'
    //       ? '  تعديل بيانات البلاغ  '
    //       : 'أضافة بلاغ جديد ';
    // }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      //  console.log(this.sub)
      this.sub.unsubscribe();
    }
  }
}
