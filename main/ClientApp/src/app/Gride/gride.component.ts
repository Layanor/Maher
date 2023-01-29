import { loadCldr } from '@syncfusion/ej2-base';
import { DataUtil } from '@syncfusion/ej2-data';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Inject,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CrudOptions } from '@syncfusion/ej2-data';

import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {
  PageSettingsModel,
  FilterSettingsModel,
  EditSettingsModel,
  GridComponent,
  GroupSettingsModel,
  SortSettingsModel,
  GridLine,
  QueryCellInfoEventArgs,
  RowDataBoundEventArgs,
  TextWrapSettingsModel,
  IEditCell,
  ContextMenuItem,
  Column,
  IFilterUI,
  SearchSettingsModel,
  PdfExportProperties,
  ExcelExportProperties,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  parentsUntil,
  IFilter,
} from '@syncfusion/ej2-angular-grids';
import { DataManager, Query, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { createElement, EmitType } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DatePicker, DateRangePicker } from '@syncfusion/ej2-angular-calendars';
import { Animation } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { HttpXsrfTokenExtractor, HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { L10n, setCulture, Ajax, enableRtl } from '@syncfusion/ej2-base';
import { Title } from '@angular/platform-browser';

enableRtl(true);

declare var require: any;
loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/ar-AE/ca-gregorian.json'),
  require('cldr-data/main/ar-AE/numbers.json'),
  require('cldr-data/main/ar-AE/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json') // To load the culture based first day of week
);
// const ajax = new Ajax('/ar-AE.json', 'GET', true);
// ajax.onSuccess = function (value) {
//   L10n.load(value);
//   console.log(value)
//   setCulture('ar-AE');
// };
// ajax.send();
L10n.load({
  'ar-AE': {
    grid: {
      EmptyRecord: 'لا توجد سجلات لعرضها',
      True: 'صحيح',
      False: 'خاطئة',
      InvalidFilterMessage: 'بيانات تصفية غير صالحة',
      GroupDropArea: 'اسحب رأس العمود هنا لتجميع الاعمدة',
      UnGroup: 'انقر هنا لإلغاء التجميع',
      GroupDisable: 'تم تعطيل التجميع لهذا العمود',
      FilterbarTitle: 'خلية شريط مرشح',
      EmptyDataSourceError:
        'يجب ألا يكون DataSource فارغًا عند التحميل الأولي نظرًا لأن الأعمدة يتم إنشاؤها من DataSource في شبكة عمود إنشاء مصدر تلقائي',
      Add: 'إضافة',
      Edit: 'تعديل',
      Cancel: 'إلغاء',
      Update: 'تحديث',
      Delete: 'حذف',
      Print: 'طباعة',
      Pdfexport: 'تصدير PDF  ',
      Excelexport: ' تصدير اكسل ',
      Wordexport: ' تصدير وورد',
      Csvexport: 'تصدير CSV',
      Search: 'ابحث هنا',
      Columnchooser: 'أعمدة',
      Save: 'حفظ',
      Item: 'بند',
      Items: 'العناصر',
      EditOperationAlert: 'لم يتم تحديد سجلات لعملية التحرير',
      DeleteOperationAlert: 'لم يتم تحديد سجلات لعملية الحذف',
      SaveButton: 'حفظ',
      OKButton: 'حسنا',
      CancelButton: 'إلغاء',
      EditFormTitle: 'تفاصيل',
      AddFormTitle: 'إضافة سجل جديد',
      BatchSaveConfirm: 'هل أنت متأكد أنك تريد حفظ التغييرات؟',
      BatchSaveLostChanges:
        'سيتم فقد التغييرات غير المحفوظة. هل أنت متأكد أنك تريد المتابعة؟',
      ConfirmDelete: 'هل أنت متأكد أنك تريد حذف اليانات',
      CancelEdit: 'هل أنت متأكد من أنك تريد إلغاء التغييرات؟',
      ChooseColumns: 'اختيار العمود',
      SearchColumns: 'أعمدة البحث',
      Matchs: 'لم يتم العثور على تطابق',
      FilterButton: 'البحث',
      ClearButton: 'مسح البحث',
      StartsWith: 'ابدا ب',
      EndsWith: 'ينتهي بـ',
      Contains: 'يحتوي على',
      Equal: 'مساو',
      NotEqual: 'ليس متساوي',
      LessThan: 'أقل من',
      LessThanOrEqual: 'اصغر من او يساوي',
      GreaterThan: 'أكثر من',
      GreaterThanOrEqual: 'أكبر من أو يساوي',
      ChooseDate: 'اختيار التاريخ',
      EnterValue: 'أدخل القيمة',
      Copy: 'نسخ',
      Group: 'تجميع حسب هذا العمود',
      Ungroup: 'فك تجميع بواسطة هذا العمود',
      autoFitAll: 'احتواء تلقائي لجميع الأعمدة',
      autoFit: 'احتواء تلقائي لهذا العمود',
      Export: 'تصدير',
      FirstPage: 'الصفحة الأولى',
      LastPage: 'آخر صفحة',
      PreviousPage: 'الصفحة السابقة',
      NextPage: 'الصفحة التالية',
      SortAscending: 'فرز تصاعدي',
      SortDescending: 'ترتيب تنازلي',
      EditRecord: 'تحرير السجل',
      DeleteRecord: 'حذف سجل',
      FilterMenu: 'البحث',
      SelectAll: 'اختر الكل',
      Blanks: 'الفراغات',
      FilterTrue: 'صحيح',
      FilterFalse: 'خاطئة',
      NoResult: 'لم يتم العثور على تطابق',
      ClearFilter: 'مرشح واضح',
      NumberFilter: 'عدد المرشحات',
      TextFilter: 'مرشحات النص',
      DateFilter: 'مرشحات التاريخ',
      DateTimeFilter: 'مرشحات DateTime',
      MatchCase: 'حالة مباراة',
      Between: 'ما بين',
      CustomFilter: 'تصفية مخصص',
      CustomFilterPlaceHolder: 'أدخل القيمة',
      CustomFilterDatePlaceHolder: 'اختيار موعد',
      AND: 'و',
      OR: 'أو',
      ShowRowsWhere: 'إظهار الصفوف حيث:',
    },
    pager: {
      currentPageInfo: '{0} من {1} صفحة',
      totalItemsInfo: '( {0}   عناصر)',
      firstPageTooltip: 'الذهاب إلى الصفحة الأولى',
      lastPageTooltip: 'الذهاب إلى الصفحة الأخيرة',
      nextPageTooltip: 'انتقل إلى الصفحة التالية',
      previousPageTooltip: 'الانتقال إلى الصفحة السابقة',
      nextPagerTooltip: 'انتقل إلى النداء التالي',
      previousPagerTooltip: 'الذهاب إلى النداء السابق',
      pagerDropDown: 'عدد السجلات   لكل صفحة',
      pagerAllDropDown: 'العناصر',
      All: 'الكل',
    },
    daterangepicker: {
      placeholder: 'اختيار نطاق التاريخ',
      startLabel: 'تاريخ البدء',
      endLabel: 'تاريخ الانتهاء',
      applyText: 'تطبيق',
      cancelText: 'إلغاء',
      selectedDays: 'أيام مختارة',
      days: 'أيام',
      customRange: 'نطاق مخصص',
    },
  },
});

setCulture('ar');
@Component({
  selector: 'app-gride',
  templateUrl: './gride.component.html',
  styleUrls: ['./gride.component.css'],
})
export class GrideComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  @Input() Datasourse: any;
  @Input() columns: any[];
  @Input() Url: string;
  @Input() titel: string;
  @Input() modelname: string;
  @Input() searchOptions: SearchSettingsModel;
  @Input() editSettings: EditSettingsModel;
  public datamanager: DataManager;
  public baseurl: string;

  // public locale = 'ar';
  public typeParams: IEditCell;
  public dpParams: IEditCell;
  public xsrf: string;
  public contextMenuItems: ContextMenuItem[];
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
  public query: Query;
  public wrapSettings: TextWrapSettingsModel;
  public toolbarOptions: object;
  public columnMenuItems: any = [
    { text: 'Clear Sorting', id: 'gridclearsorting' },
  ];

  public formatOptions: object;
  public customAttributes: object;
  public groupOptions: GroupSettingsModel;
  public height: string | number;
  public width: string | number;
  public gridLines: GridLine;
  public textWrap: boolean;
  public filtertemplate: IFilter;
  public dateRangePicker: DateRangePicker;
  public elem: HTMLElement;
  public datePickerObj: DatePicker;

  public value = 'value';
  public sortSettings: SortSettingsModel = {
    columns: [{ direction: 'Ascending', field: 'id' }],
  };

  @ViewChild('element1') element1: any;
  @ViewChild('grid') public grid: GridComponent;

  constructor(
    private titleService: Title,
    public http: HttpClient,
    private tokenExtractor: HttpXsrfTokenExtractor,
    @Inject('BASE_URL') baseUrl: string,
    private notificationsService: NotificationsService
  ) {
    this.baseurl = baseUrl;

    // if (this.xsrf === undefined || this.xsrf === '') {
    //   const name = 'XSRF-TOKEN' + '=';
    //   const decodedCookie = decodeURIComponent(document.cookie);
    //   const ca = decodedCookie.split(';');
    //   for (let i = 0; i < ca.length; i++) {
    //     let c = ca[i];
    //     while (c.charAt(0) === ' ') {
    //       c = c.substring(1);
    //     }
    //     if (c.indexOf(name) === 0) {
    //       this.xsrf = c.substring(name.length, c.length);
    //     }
    //   }
    // }
    // if (
    //   this.authtoken === undefined ||
    //   this.authtoken === '' ||
    //   this.authtoken === null
    // ) {
    //   this.sub = this.authorize
    //     .getAccessToken()
    //     .pipe(
    //       map((token) => {
    //         if (token != null) {
    //           this.authtoken = token;
    //         }
    //       })
    //     )
    //     .subscribe();
    // }
  }
  ngOnInit() {
    this.titleService.setTitle(this.titel);
    if (this.Datasourse !== null) {
      this.notificationsService.success(this.titel);
      this.datamanager = new DataManager({
        json: DataUtil.parse.parseJson(this.Datasourse[0].result),
        headers: [
          {
            'X-XSRF-TOKEN': this.xsrf,
            Authorization: `Bearer ${this.Datasourse[1]}`,
            withCredentials: true,
          },
        ],
        adaptor: new RemoteSaveAdaptor(),
        url: this.baseurl + '/' + this.Url,
        insertUrl: this.baseurl + this.Url + '/Insert',
        updateUrl: this.baseurl + this.Url + '/Update',
        removeUrl: this.baseurl + this.Url + '/Delete',
      });
      this.datamanager.adaptor.processResponse = (
        rdata: any, // DataResult
        ds?: any,
        query?: Query,
        xhr?: XMLHttpRequest,
        request?: Ajax,
        changes?: CrudOptions
      ): void => {
        // console.log('data', rdata);
        // console.log('ds', ds);
        // console.log('query', query);
        // console.log('xhr', xhr);
        // console.log('request', request);
        // console.log('changes', changes);

        if (xhr !== undefined) {
          const status: number = xhr.status;
          // console.log(rdata);
          // console.log(ds);
          // console.log(query);
          // console.log(xhr);
          // console.log(request);
          // console.log(changes);
          switch (status) {
            case 200:
              // console.log(this.grid.dataSource);
              // console.log('ccc', this.grid.getCurrentViewRecords());
              // const x: any[] = this.grid.getCurrentViewRecords();
              // const b = x.filter((c) => c.id === rdata.id);
              // console.log('b', b);
              // console.log('ccc', this.grid.getCurrentViewRecords());
              //  (this.grid.dataSource as object[]).unshift(rdata);
              this.notificationsService.success(
                ' تم تعديل ' + this.modelname + ' بنجاح '
              );
              break;
            case 201:
              //  this.notificationsService.success(xhr.responseText);
              this.notificationsService.success(
                ' تم أضافة ' + this.modelname + ' بنجاح   '
                // xhr.responseText
              );
              ds.dataSource.json.push(rdata);
              //    this.grid.refresh();
              break;
            case 202:
              //  this.grid.refresh();
              this.notificationsService.success(
                ' تم حذف ' + this.modelname + ' بنجاح   '
                //  xhr.responseText
              );
              break;
            case 400:
              this.notificationsService.error(status, xhr.responseText);
              break;
            default:
              this.notificationsService.error(xhr.responseText);
              //  console.log('xhr', xhr);

              break;
          }
          //  this.grid.refresh();
        }
      };
    }
    // console.log(this.datamanager.dataSource.json )
    this.gridLines = 'Both';
    this.height = 'auto';
    this.width = 'auto';
    this.textWrap = true;
    this.wrapSettings = { wrapMode: 'Both' };
    this.groupOptions = { showGroupedColumn: true };
    this.pageSettings = {
      pageSize: 50,
      pageSizes: ['5', '10', '20', '100', '200', '300'],
      pageCount: 10,
      enableQueryString: true,
    };
    this.toolbarOptions = [
      'ColumnChooser',
      'Search',
      'Add',
      'Edit',
      'Delete',
      'Update',
      'Cancel',
      'Print',
      'ExcelExport',
      {
        text: ' تحديث البيانات',
        tooltipText: ' تحديث البيانات',
        prefixIcon: 'e-icons e-ref',
        id: 'clearsearch',
        align: 'Right',
      },
      // { text: 'Click', tooltipText: 'Click', prefixIcon: 'e-icons e-ref', id: 'Click' }
      // { text: 'Expand All', tooltipText: 'Expand All', prefixIcon: 'e-expand', id: 'expandall' },
      // { text: 'Collapse All', tooltipText: 'collection All', prefixIcon: 'e-collapse', id: 'collapseall', align: 'Right' }
    ];
    this.filterSettings = {
      type: 'Menu',
      // params: {
      //   format: 'dd/MM/yyyy hh:mm',
      // },

      // type: 'FilterBar',
      //  type: 'Excel',
      mode: 'Immediate',
      // operators: 'contains ',
    };
    this.columns.forEach((c) => {
      if (c['field'] === 'EnterDateTime') {
        this.filtertemplateOptions(c['field']);
        c['filter'] = this.filtertemplate;
        // {type:"Menu", params: {
        //   format: 'dd/MM/yyyy hh:mm'
        // }}
        // this.filtertemplate
      }
      // if (c['filterBTemplate'] != null) {
      //   c.filterBarTemplate = this.templateOptions(c['filterBTemplate']);
      // //  c.filter = { type: 'FilterBar' };
      //   // this.grid.filterSettings = {
      //   //   type: 'FilterBar',
      //   //   mode: 'Immediate',
      //   // };
      // }
    });

    // this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
    //  this.customAttributes = { class: 'customcss' };
    // this.dpParams = { params: { value: new Date() } };

    //

    // this.contextMenuItems = [
    //   'AutoFit',
    //   'AutoFitAll',
    //   'SortAscending',
    //   'SortDescending',
    //   'Copy',
    //   'Edit',
    //   'Delete',
    //   'Save',
    //   'Cancel',
    //   'PdfExport',
    //   'ExcelExport',
    //   'CsvExport',
    //   'FirstPage',
    //   'PrevPage',
    //   'LastPage',
    //   'NextPage',
    // ];
  }
  filterbartemplateOptions(v: string): IFilterUI {
    let templateOption: IFilterUI;
    if (v === 'EnterDateTime') {
      //   console.log(v);
      //   templateOption = {
      //     create: (args: { target: Element, column: Object }) => {
      //       let db: Object = new DataManager(DataUtil.parse.parseJson(this.Datasourse[0].result));
      //       let flValInput: HTMLElement = createElement('input', { className: 'flm-input' });
      //       args.target.appendChild(flValInput);
      //       var _this = this;
      //       this.dateRangePicker = new DateRangePicker({
      //         // min: new Date('1/15/2019'),
      //         // max: new Date('12/20/2019'),
      //         placeholder: 'اختر التاريخ',
      //         floatLabelType: 'Never',
      //         change: function (e) {
      //           let target: any = args.target;
      //           if (e.value) {
      //             _this.grid.filterSettings.columns = [
      //               { "value": e.value[0], "operator": "greaterthan", "field": v },
      //               { "value": e.value[1], "operator": "lessthan", "field": v }]
      //           }
      //           else {
      //             _this.grid.filterSettings.columns = [];
      //             _this.grid.removeFilteredColsByField(target.id);
      //           }
      //         },
      //       });
      //       this.dateRangePicker.appendTo(flValInput);
      //       return flValInput;
      //     },
      //     write: (args:
      //       {
      //         column: Object,
      //         target: Element,
      //         parent: any,
      //         filteredValue: number | string
      //       }
      //     ) => {
      //     },
      //     read: (args:
      //       {
      //         target: Element,
      //         column: any,
      //         operator: string,
      //         fltrObj: any
      //         }
      //       ) => {
      //       args.fltrObj.filterByColumn(args.column.field, null, this.dateRangePicker.value);
      //     }
      // }
    } else {
      templateOption = {
        create: (args: { element: Element; column: Column }) => {
          const dd = document.createElement('select');
          dd.style.width = '100%';
          dd.style.border = 'none';
          dd.style.borderBottom = '2px';
          dd.style.borderBottom = 'solid';
          dd.style.borderBottomColor = 'darkgreen';

          const option: HTMLOptionElement = document.createElement('option');
          option.value = 'الجميع';
          option.innerHTML = 'الجميع';
          dd.appendChild(option);
          const data = this.Datasourse[0].result;
          for (const value of data) {
            const option: HTMLOptionElement = document.createElement('option');
            option.value = value[v];
            option.innerHTML = value[v];
            dd.appendChild(option);
          }
          return dd;
        },
        write: (args: { element: Element; column: Column }) => {
          args.element.addEventListener('input', (args1: Event): void => {
            const target: HTMLInputElement =
              args1.currentTarget as HTMLInputElement;

            if (target.value !== 'الجميع') {
              const value = target.value;

              this.grid.filterByColumn(v, 'equal', value);
            } else {
              this.grid.removeFilteredColsByField(v);
            }
          });
        },
      };
    }
    return templateOption;
  }
  filtertemplateOptions(v: string): void {
    if (v == 'EnterDateTime') {
      // console.log(v);
      this.filtertemplate = {
        ui: {
          create: (args: { target: Element; column: Object }) => {
            let db: Object = new DataManager(this.Datasourse);
            let flValInput: HTMLElement = createElement('input', {
              className: 'flm-input',
            });
            args.target.appendChild(flValInput);
            var _this = this;
            this.dateRangePicker = new DateRangePicker({
              // min: new Date('1/15/2019'),
              // max: new Date('12/20/2019')
              placeholder: 'الرجاء اختيار التاريخ',
              floatLabelType: 'Never',
              format: 'dd/MM/yyyy hh:mm',
              locale: 'ar-AE',
              openOnFocus: true,
              change: function (e) {
                let target: any = args.target;
                //  console.log(e)
                //  console.log(target)
                if (e.value) {
                  //  console.log(e.value)
                  // _this.grid.filterByColumn(v, 'greaterthan', e.value[0] , "AND" );
                  // _this.grid.filterByColumn(v, 'lessthan', e.value[1]  );
                  let d = new Date(e.value[1]);
                  let lastdate = d.setDate(d.getDate() + 1);
                  // console.log(new Date(lastdate));
                  _this.grid.filterSettings.type = 'Menu';
                  _this.grid.filterSettings.columns = [
                    {
                      value: e.value[0],
                      operator: 'greaterthanorequal',
                      field: v,
                    },
                    {
                      value: new Date(lastdate),
                      operator: 'lessThanOrEqual',
                      field: v,
                      predicate: 'and',
                    },
                  ];
                  // this.grid.filterByColumn(v, 'equal', value);
                } else {
                  _this.grid.filterSettings.columns = [];
                  _this.grid.removeFilteredColsByField(target.id);
                  this.grid.removeFilteredColsByField(v);
                }
              },
            });
            this.dateRangePicker.appendTo(flValInput);
          },
          write: (args: {
            column: Object;
            target: Element;
            parent: any;
            filteredValue: number | string;
          }) => {},
          read: (args: {
            target: Element;
            column: any;
            operator: string;
            fltrObj: any;
          }) => {
            args.fltrObj.filterByColumn(
              args.column.field,
              null,
              this.dateRangePicker.value
            );
          },
        },
        params: {
          format: 'dd/MM/yyyy hh:mm',
        },
      };
    }
  }

  public created(args) {
    const grid = this.grid;
    //  console.log(this.columns);

    // for (const coll of this.columns) {
    //   (grid.columns as Column[]).push(new Column(coll));
    // }
    const gridElement = this.grid.element;
    const span = document.createElement('span');
    span.className = 'e-clear-icon';
    span.id = gridElement.id + 'clear';
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement
      .querySelector('.e-toolbar-item .e-input-group')
      .appendChild(span);
    const placeholderVal = 'ابحث هنا';
    // placeholder text (for demonstration purpose we have used the corresponding column field name as placeholder)
    gridElement
      .querySelectorAll('.e-filtertext')
      .forEach((r) =>
        r.getAttribute('disabled')
          ? ''
          : r.setAttribute('placeholder', placeholderVal)
      );
    //
    gridElement
      .querySelectorAll('.e-control-wrapper ')
      .forEach((r) =>
        r.lastChild ? r.setAttribute('style', ' border: none') : ''
      );
    //
    //  const gridid = this.grid.toolbarModule['gridID']
    const gridid = gridElement.id;
    const st = gridid + '_searchbar';
    const sershinput = gridElement.querySelector('#' + st);
    sershinput.addEventListener('keyup', function (e) {
      grid.searchSettings.key = e.target['value'];
    });
  }

  changes(args) {
    //  console.log(args);
    let targEle: any = parentsUntil(args.element, 'e-filtertext');
    let columnName: string = targEle.id.replace('_filterBarcell', '');
    if (args.value) {
      this.grid.filterByColumn(columnName, 'equal', args.value);
    } else {
      this.grid.removeFilteredColsByField(columnName);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const gridn = this.grid;
    if (gridn != undefined) {
      this.datamanager.dataSource.json = this.Datasourse[0].result;
      this.grid.refresh();
    }

    //console.log(changes);
  }
  dataSourceChanged(e: DataSourceChangedEventArgs): void {
    console.log('dataSourceChanged', e);
    // console.log(JSON.stringify(e));
  }

  public dataStateChange(e: DataStateChangeEventArgs): void {
    console.log('dataStateChange' + JSON.stringify(e));
    //  console.log(e);
    // this.grid.notify('recordAdded', e);
  }
  dataSourceChange(e: DataStateChangeEventArgs): void {
    // console.log("dataSourceChange" + JSON.stringify(e))
    const gridn = this.grid;
    if (gridn != undefined) {
      //  console.log(this.grid);
      this.grid.refresh();
    }
    //  console.log(e)
    //  console.log(JSON.stringify(e))
  }

  actionbegin(args: any) {
    // console.log(args);
    for (const cols of this.grid.columns) {
      if (
        (cols as Column).type === 'string' ||
        (cols as Column).type === 'number'
      ) {
        (cols as Column).filter.operator = 'contains';
      }
      //
    }
    //  console.log(this.modelname);
    //   console.log(args.requestType);
    // if (args.requestType === 'beginEdit' || args.requestType === 'add') {
    //   this.xsrf = this.tokenExtractor.getToken() as string;
    //   for (const cols of this.grid.columns) {
    //     if ((cols as Column).field === 'directorate.name') {
    //       (cols as Column).visible = false;
    //     }
    //   }
    // }
  }
  actionComplete(args: any) {
    if (
      args.requestType == 'filterafteropen' &&
      args.columnName == 'EnterDateTime'
    )
      args.filterModel.dlgObj.element.querySelector('.e-flm_optrdiv').hidden =
        true;
    //  console.log(this.modelname);
    // if (args.requestType === 'save') {
    //   this.grid.dataSourceChanged();
    // }
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      const dialog = args.dialog;
      dialog.header =
        args.requestType === 'beginEdit'
          ? ' تعديل بيانات  ' + this.modelname
          : 'اضافة ' + this.modelname;
      dialog.buttons[0].buttonModel.cssClass = 'e-success';
    }
    //   this.grid.refresh();
    // this.grid.element.classList.remove('disablegrid');
    // document.getElementById("GridParent").classList.remove('wrapper');
  }
  onActionFailure(e: any): void {
    console.log(e);
    if (e.error?.error?.status === 401) {
      this.notificationsService.error('الرجاء اعادة تسجيل الدخول');
      // setTimeout(() => {
      //   this.authorize.signOut('/');
      //   window.sessionStorage.clear();
      //   window.localStorage.clear();
      //   sessionStorage.clear();
      //   this.router.navigateByUrl('/authentication/logout');
      // }, 4000);
      //this.router.navigateByUrl('/');
    } else {
      this.notificationsService.error('الرجاء اغلاق المتصفح والمحاولة من جديد');
      // this.router.navigateByUrl('/');
    }
  }

  queryCellInfo(args: QueryCellInfoEventArgs) {
    // if (args.column.field === 'MedCenterTypesId') {
    //   if (+args.data[args.column.field] === 1) {
    //     args.cell.classList.add('below-30');
    //   } else if (+args.data[args.column.field] === 2) {
    //     args.cell.classList.add('below-80');
    //   } else {
    //     args.cell.classList.add('above-80');
    //   }
    // }
  }
  public queryCellInfoEvent: EmitType<QueryCellInfoEventArgs> = (
    args: QueryCellInfoEventArgs
  ) => {
    const tooltip: Tooltip = new Tooltip(
      {
        content: args.data[args.column.field]
          ? args.data[args.column.field].toString()
          : 'الرجاء اختيار المهمة',
      },
      args.cell as HTMLTableCellElement
    );
  };
  beforeDataBound(args: any) {}

  dataBound(args: any) {
    Object.assign((this.grid.filterModule as any).filterOperators, {
      startsWith: 'contains',
    });

    // (this.grid.columns[0] as any).isPrimaryKey = 'true';
    // // or
    // const column: ColumnModel = this.grid.getColumnByField('id');
    // column.isPrimaryKey = true;
    // column.width = 3000;
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
    // const OrderID = 'OrderID';
    // if (args.data[OrderID] === 10249) {
    //   args.rowHeight = 90;
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
  load(args: any) {}

  ngAfterViewInit() {
    const animation: Animation = new Animation({
      name: 'FadeIn',
      duration: 1000,
    });
    animation.animate(this.element1.nativeElement, { name: 'SlideRightIn' });
    // animation.animate(this.element2.nativeElement, { name: 'ZoomOut' });
  }
  ngOnDestroy(): void {
    this.grid.enablePersistence = false;
    // Clear grid’s local storage data
    window.localStorage.setItem('gridgrid', '');
    //  this.clearSearch();
    this.grid.filterSettings.columns = [];
    // Destroy the grid
    this.grid.destroy();
  }
  commandClick(args): void {
    if (args.commandColumn.type === 'Delete') {
      //   console.log('uuuuu', args);
      // const dialog = args.dialog;
      // dialog.header =  ' تعديل بيانات  ' + this.modelname  ;
    }
    //
    if (args.target.title === 'Details') {
      // const rdata:any =JSON.stringify(args.rowData)
      //  const rdata: any = args.rowData;
    }
  }

  public cancelBtnClick(args) {
    this.grid.searchSettings.key = '';
    (
      this.grid.element.querySelector('.e-input-group.e-search .e-input') as any
    ).value = '';
    const inp = document.getElementsByClassName('searchtext')[0] as any;
    if (inp !== undefined && inp !== null) {
      inp.value = '';
    }
    this.grid.filterSettings.columns = [];
  }
  public columnMenuClick(args: MenuEventArgs) {
    if (args.item.id === 'gridclearsorting') {
      this.grid.clearSorting();
    }
  }
  // public search(args) {
  //  this.grid.searchSettings.key = "";
  //  (this.grid.element.querySelector(".e-input-group.e-search .e-input") as any).value = "";
  // }

  // public valueAccess = (field: string, data1: object, column: object) => {
  //   return 'الاسم المختصر ' + ' : ' + data1[field];
  // };

  // public valueAccess2 = (field: string, data: object, column: object) => {
  //   return data[field]
  //     .map((s: { FirstName: string; LastName: string }) => {
  //       return s.LastName || s.FirstName;
  //     })
  //     .join(' ');
  // };

  // public valueAccess3 = (
  //   field: string,
  //   data: { Protein: number; Fat: number; Carbohydrate: number },
  //   column: Object
  // ): number => {
  //   return data.Protein * 4 + data.Fat * 9 + data.Carbohydrate * 4;
  // };

  //
  printComplete() {
    for (const columns of this.grid.columns) {
      if ((columns as Column).field === 'jobs') {
        (columns as Column).visible = true;
      }
      if ((columns as Column).field === 'id') {
        (columns as Column).visible = false;
      }
      // else if ((columns as Column).field === 'ShipCity') {
      //  (columns as Column).visible = true;
      // }
    }
  }
  toolbarClickHandler(args: ClickEventArgs): void {
    //  console.log('toolbarClickHandler', args.item.id);
    if (args.item.id === 'expandall') {
      this.grid.groupModule.expandAll();
    }

    if (args.item.id === 'collapseall') {
      this.grid.groupModule.collapseAll();
    }
    if (args.item.id === 'clearsearch') {
      this.grid.clearFiltering();
      this.grid.searchSettings.key = '';
      this.grid.clearSorting();
      this.grid.clearGrouping();
      this.grid.clearSelection();
      this.grid.filterSettings.columns = [];
      this.grid.enablePersistence = false;
      window.localStorage.setItem('gridgrid', '');
      this.grid.refresh();
      this.grid.enablePersistence = true;
      this.grid.refresh();
      // this.grid.filterModule.
      // this.grid.search('');
    }
    if (args.item.id.includes('print')) {
      //   console.log('toolbarClickHandler', args.item.id);
      for (const columns of this.grid.columns) {
        if ((columns as Column).field === 'jobs') {
          (columns as Column).visible = false;
        }
        if ((columns as Column).field === 'id') {
          (columns as Column).visible = true;
        }
        // else if ((columns as Column).field === 'ShipCity') {
        //  (columns as Column).visible = false;
        // }
      }
    }
    if (args.item.id.includes('excelexport')) {
      // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
      // (this.grid.columns[0] as Column).visible = false;
      // (this.grid.columns[5] as Column).visible = false;
      const excelExportProperties: ExcelExportProperties = {
        exportType: 'CurrentPage',
        // includeHiddenColumn: true,
        fileName: 'new.xlsx',
        // header: {
        //   headerRows: 7,
        //   rows: [
        //     {
        //       cells: [{
        //         colSpan: 4, value: 'Northwind Traders',
        //         style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true, }
        //       }]
        //     },
        //     {
        //       cells: [{
        //         colSpan: 4, value: '2501 Aerial Center Parkway',
        //         style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
        //       }]
        //     },
        //     {
        //       cells: [{
        //         colSpan: 4, value: 'Suite 200 Morrisville, NC 27560 USA',
        //         style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
        //       }]
        //     },
        //     {
        //       cells: [{
        //         colSpan: 4, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
        //         style: { fontColor: '#C67878', fontSize: 15, hAlign: 'Center', bold: true, }
        //       }]
        //     },
        //     {
        //       cells: [{
        //         colSpan: 4, hyperlink: { target: 'https://www.northwind.com/', displayText: 'www.northwind.com' },
        //         style: { hAlign: 'Center' }
        //       }]
        //     },
        //     { cells: [{ colSpan: 4, hyperlink: { target: 'mailto:support@northwind.com' }, style: { hAlign: 'Center' } }] },
        //   ]
        // },
        // footer: {
        //   footerRows: 4,
        //   rows: [
        //     { cells: [{ colSpan: 4, value: 'Thank you for your business!', style: { hAlign: 'Center', bold: true } }] },
        //     { cells: [{ colSpan: 4, value: '!Visit Again!', style: { hAlign: 'Center', bold: true } }] }
        //   ]
        // },
        // theme:
        // {
        //   header: { fontName: 'Segoe UI', fontColor: '#666666' },
        //   record: { fontName: 'Segoe UI', fontColor: '#666666' },
        //   caption: { fontName: 'Segoe UI', fontColor: '#666666' }
        // }
      };
      this.grid.excelExport(excelExportProperties);
    }
    if (args.item.id.includes('pdfexport')) {
      // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
      (this.grid.columns[0] as Column).visible = false;
      (this.grid.columns[5] as Column).visible = false;
      // for (const columns of this.grid.columns) {
      //   if ((columns as Column).field === 'jobs') {
      //     (columns as Column).visible = false;
      //   }
      //   if ((columns as Column).field === 'id') {
      //     (columns as Column).visible = false;
      //   }
      // }
      const pdfExportProperties: PdfExportProperties = {
        hierarchyExportMode: 'Expanded',
        fileName: 'new.pdf',
        pageOrientation: 'Landscape',
        pageSize: 'Letter',
        exportType: 'CurrentPage',
        // includeHiddenColumn: true,

        header: {
          fromTop: 0,
          height: 130,

          //   contents: [
          //     {
          //         type: 'PageNumber',
          //         pageNumberType: 'Arabic',
          //         format: 'Page {$current} of {$total}', //optional
          //         position: { x: 0, y: 25 },
          //         style: { textBrushColor: '#ffff80', fontSize: 15, hAlign: 'Center' }
          //     }
          // ]

          //   contents: [
          //     {
          //         type: 'Line',
          //         style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
          //         points: { x1: 0, y1: 4, x2: 685, y2: 4 }
          //     }
          // ],
          contents: [
            {
              type: 'Text',
              value: 'test',
              position: { x: 0, y: 50 },
              style: { textBrushColor: '#000000', fontSize: 13 },
            },
          ],
        },
        footer: {
          fromBottom: 160,
          height: 150,
          contents: [
            {
              type: 'PageNumber',
              pageNumberType: 'Arabic',
              format: 'Page {$current} of {$total}',
              position: { x: 0, y: 25 },
              style: { textBrushColor: '#000000', fontSize: 15 },
            },
          ],
        },

        // theme: {
        //   header: {
        //     font: new PdfTrueTypeFont(base64kufefont, 12, PdfFontStyle.Bold),
        //   },
        //   caption: { font: new PdfTrueTypeFont(base64kufefont, 10) },
        //   record: { font: new PdfTrueTypeFont(base64kufefont, 9) },
        // },
        //   theme: {
        //     header: {
        //         fontColor: '#64FA50', fontName: 'Calibri', fontSize: 17, bold: true,
        //         border: { color: '#64FA50', dashStyle: 'Solid' }
        //     },
        //     record: {
        //         fontColor: '#64FA50', fontName: 'Calibri', fontSize: 17, bold: true
        //     },
        //     caption: {
        //         fontColor: '#64FA50', fontName: 'Calibri', fontSize: 17, bold: true
        //     }
        // }

        //   header: {font:  new PdfStandardFont(PdfFontFamily.TimesRoman, 11, PdfFontStyle.Bold),
        //     caption: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 9) },
        //     record: { font: new PdfStandardFont(PdfFontFamily.TimesRoman, 10) }
        // }
      };
      this.grid.pdfExport(pdfExportProperties);
    }
  }
  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
  }
  pdfQueryCellInfo(args: any): void {
    if (args.column.field === 'Freight') {
      if (args.value < 30) {
        args.style = { backgroundColor: '#99ffcc' };
      } else if (args.value < 60) {
        args.style = { backgroundColor: '#ffffb3' };
      } else {
        args.style = { backgroundColor: '#ff704d' };
      }
    }
  }
  pdfExportComplete(): void {
    // (this.grid.columns[1] as Column).visible = false;
    // (this.grid.columns[2] as Column).visible = true;
    for (const columns of this.grid.columns) {
      if ((columns as Column).field === 'id') {
        (columns as Column).visible = false;
      }
      if ((columns as Column).field === 'jobs') {
        (columns as Column).visible = true;
      }
    }
  }
  // excelQueryCellInfo(args: ExcelQueryCellInfoEventArgs): void {
  //   if (args.column.field === 'Freight') {
  //     if (args.value < 30) {
  //       args.style = { backColor: '#99ffcc' };
  //     } else if (args.value < 60) {
  //       args.style = { backColor: '#ffffb3' };
  //     } else {
  //       args.style = { backColor: '#ff704d' };
  //     }
  //   }
  // }
  excelExportComplete(): void {
    // (this.grid.columns[0] as Column).visible = false;
    // (this.grid.columns[5] as Column).visible = true;
  }
}

///

/* List<object> toolbarItems = new List<object>();
    toolbarItems.Add(new { text = "Expand All", tooltipText = "Expand All", prefixIcon = "e-expand", id = "expandall" });
    toolbarItems
    .Add(new { text = "Collapse All", tooltipText = "Collapse All", prefixIcon = "e-collapse", id = "collapseall", align = "left" });
    toolbarItems.AddRange(new List<string>() { "ColumnChooser", "ExcelExport", "PdfExport", "CsvExport", "Print", "Search" });
    toolbarItems.Add(new { text = "مسح البحث", tooltipText = "Clear Search", prefixIcon = "e-coll", id = "Click" });
   */
/*   List<object> commands = new List<object>();
      commands
      .Add(new { type = "userstatus", buttonOption = new { content = "تعديل", iconCss = "e-icons e-edit", cssClass = "e-flat" } });
      // custom */

// this.templateOptions = {
//   create: (args: { element: Element; column: Column }) => {
//     const dd = document.createElement('select');
//     dd.style.width = '100%';
//     dd.style.border = 'none';
//     dd.style.borderBottom = '2px';
//     dd.style.borderBottom = 'solid';
//     dd.style.borderBottomColor = 'darkgreen';

//     dd.id = 'MedCenterTypesId';

//     const dataSource: MedCenterType[] = [
//       { name: 'الجميع', MedCenterTypesId: 0 },
//     ];
//     const datas = dataSource.concat(this.mdtype);
//     for (const value of datas) {
//       const option: HTMLOptionElement = document.createElement('option');
//       option.value = value.name;
//       option.innerHTML = value.name;
//       dd.appendChild(option);
//     }
//     return dd;
//   },
//   write: (args: { element: Element; column: Column }) => {
//     args.element.addEventListener('input', (args1: Event): void => {
//       const target: HTMLInputElement = args1.currentTarget as HTMLInputElement;

//       if (target.value !== 'الجميع') {
//         const value = target.value;
//         this.grid.filterByColumn(target.id, 'equal', value);
//       } else {
//         this.grid.removeFilteredColsByField(target.id);
//       }
//     });
//   },
// };
//
//  const data: any = args.data;
/*  switch (data.EmployeeID) {
       case 10001:
         if (args.column.field === '9:00' || args.column.field === '2:30' || args.column.field === '4:30') {
           args.colSpan = 2;
         } else if (args.column.field === '11:00') {
           args.colSpan = 3;
         }
         break;
       case 10002:
         if (args.column.field === '9:30' || args.column.field === '2:30' ||
           args.column.field === '4:30') {
           args.colSpan = 3;
         } else if (args.column.field === '11:00') {
           args.colSpan = 4;
         }
         break;
       case 10003:
         if (args.column.field === '9:00' || args.column.field === '11:30') {
           args.colSpan = 3;
         } else if (args.column.field === '10:30' || args.column.field === '3:30' ||
           args.column.field === '4:30' || args.column.field === '2:30') {
           args.colSpan = 2;
         }
         break;
       case 10004:
         if (args.column.field === '9:00') {
           args.colSpan = 3;
         } else if (args.column.field === '11:00') {
           args.colSpan = 4;
         } else if (args.column.field === '4:00' || args.column.field === '2:30') {
           args.colSpan = 2;
         }
         break;
       case 10005:
         if (args.column.field === '9:00') {
           args.colSpan = 4;
         } else if (args.column.field === '11:30') {
           args.colSpan = 3;
         } else if (args.column.field === '3:30' || args.column.field === '4:30' || args.column.field === '2:30') {
           args.colSpan = 2;
         }
         break;
       case 10006:
         if (args.column.field === '9:00' || args.column.field === '4:30' ||
           args.column.field === '2:30' || args.column.field === '3:30') {
           args.colSpan = 2;
         } else if (args.column.field === '10:00' || args.column.field === '11:30') {
           args.colSpan = 3;
         }
         break;
       case 10007:
         if (args.column.field === '9:00' || args.column.field === '3:00' || args.column.field === '10:30') {
           args.colSpan = 2;
         } else if (args.column.field === '11:30' || args.column.field === '4:00') {
           args.colSpan = 3;
         }
         break;
       case 10008:
         if (args.column.field === '9:00' || args.column.field === '10:30' || args.column.field === '2:30') {
           args.colSpan = 3;
         } else if (args.column.field === '4:00') {
           args.colSpan = 2;
         }
         break;
       case 10009:
         if (args.column.field === '9:00' || args.column.field === '11:30') {
           args.colSpan = 3;
         } else if (args.column.field === '4:30' || args.column.field === '2:30') {
           args.colSpan = 2;
         }
         break;
       case 100010:
         if (args.column.field === '9:00' || args.column.field === '2:30' ||
           args.column.field === '4:00' || args.column.field === '11:30') {
           args.colSpan = 3;
         } else if (args.column.field === '10:30') {
           args.colSpan = 2;
         }
         break;
     } */
// get the Grid model.
//  let value: string = window.localStorage.getItem('gridgrid'); //"gridgrid" is component name + component id.
//   console.log(value)
// let model: Object = JSON.parse(model);
// set the Grid model.
// window.localStorage.setItem('gridgrid', JSON.stringify(model)); //"gridgrid" is component name + component id.
// this.grid.dataSource = new DataManager({
//   json: this.dir,
//   adaptor: new RemoteSaveAdaptor(),
//   insertUrl: '/Home/Insert',
//   updateUrl: '/Home/Update',
//   removeUrl: '/Home/Delete',
// });
//  console.log("load" + JSON.stringify(args))
//  console.log("DataBound" + JSON.stringify(this.grid))
/*   this.grid.dataSource = new DataManager({
        json: this.dir.result,
        adaptor: new RemoteSaveAdaptor(),
        insertUrl: '/Home/Insert',
        updateUrl: '/Home/Update',
        removeUrl: '/Home/Delete',
      }); */
//  console.log("beforeDataBound" + JSON.stringify(args))
//  console.log("beforeDataBound" + this.grid)
// this.grid.dataSource = new DataManager({
//   json: this.dir.result,
//   adaptor: new RemoteSaveAdaptor(),
//   insertUrl: '/Home/Insert',
//   updateUrl: '/Home/Update',
//   removeUrl: '/Home/Delete',
// });
//  console.log("beforeDataBound" + args)

// this.grid.autoFitColumns(['Name', 'ShortName']);

/*     for (const cols of this.grid.columns) {
          if ((cols as any).field === 'OrderID') {
            (cols as any).width = 120;


          }
          if ((cols as any).field === 'OrderDate') {
            (cols as any).type = 'date';
            (cols as any).format = 'yMd';
            //  (cols as any).showColumnMenu = false;
          }
          if ((cols as any).field === 'Freight') {
            (cols as any).format = 'P2';
          }

        } */
// this.grid.refreshColumns();

/*   showColumnChooser() {
      this.grid.columnChooserModule.openColumnChooser(200, 50); // give X and Y axis
    } */
/*  // UrlAdaptor
   public dataManager: DataManager = new DataManager({
      url: 'api/Directorates/UrlDatasource',
      updateUrl: 'api/Directorates/Update',
      insertUrl: 'api/Directorates/Insert',
      removeUrl: 'api/Directorates/Delete',
      adaptor:  new UrlAdaptor(),

      // offline: true

  }); */

/*   reorderMultipleCols(): void {
      this.grid.reorderColumns(['OrderID', 'CustomerID'], 'ShipName');
    } */

/*   reorderSingleCol(): void {
      this.grid.reorderColumns('OrderID', 'CustomerID');
    } */

/* toolbarClick(args: ClickEventArgs): void {
    if(args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
    args.cancel = true;  // prevent default exporting
    let state = {};
    this.service.getData(state).subscribe(e => {    // get all records from service
        let pdfExportProperties: any = {
            dataSource: result ? result : e.result  // assign result to data source property
        };
        this.grid.pdfExport(pdfExportProperties);   // Export all page records
    });
  }
  } */
