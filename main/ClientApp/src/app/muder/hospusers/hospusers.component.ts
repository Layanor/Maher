import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  Inject,
  AfterViewInit,
} from '@angular/core';

import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import {
  PageSettingsModel,
  FilterSettingsModel,
  EditSettingsModel,
  GridComponent,
  ColumnModel,
  GroupSettingsModel,
  SortSettingsModel,
  GridLine,
  QueryCellInfoEventArgs,
  RowDataBoundEventArgs,
  TextWrapSettingsModel,
  IEditCell,
  CommandModel,
  CommandClickEventArgs,
  Print,
  ContextMenuItem,
  Column,
  DropDownEditCell,
  IFilterUI,
  SearchSettingsModel,
  PdfExportProperties,
  ExcelExportProperties,
  ExcelQueryCellInfoEventArgs,
  DataSourceChangedEventArgs,
  DataStateChangeEventArgs,
  IRow,
  RowSelectEventArgs,
} from '@syncfusion/ej2-angular-grids';
import { DataManager, Query, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DatePicker } from '@syncfusion/ej2-angular-calendars';
import { Animation } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { MedCenterType, UsersModel } from '../../../app/classes/mod';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpXsrfTokenExtractor, HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { closest } from '@syncfusion/ej2-base';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UsersaddComponent } from './usersadd/usersadd.component';
import { UsersService } from './Users.service';
import { UsereditComponent } from './useredit/useredit.component';
import { UserdeleteComponent } from './userdelete/userdelete.component';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-hospusers',
  templateUrl: './hospusers.component.html',
  styleUrls: ['./hospusers.component.css'],
})
export class HospUsersComponent implements OnInit, OnDestroy, AfterViewInit {
  public usertype = 0;
  selecteduserid: string;
  modalRef: BsModalRef;
  bsModalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true,
  };
  public templateOptions: IFilterUI;
  private sub: Subscription;
  private sub2: Subscription;

  public usersModels: UsersModel[];
  public mdtype: MedCenterType[];

  public typeParams: IEditCell;
  public dpParams: IEditCell;
  public xsrf: string;

  public contextMenuItems: ContextMenuItem[];
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
  public searchOptions: SearchSettingsModel;
  public data2: DataManager;
  public data: DataManager;
  public query: Query;
  public wrapSettings: TextWrapSettingsModel;
  public toolbarOptions: object;
  public columnMenuItems: any = [
    { text: 'Clear Sorting', id: 'gridclearsorting' },
  ];
  public editSettings: EditSettingsModel;
  public formatOptions: object;
  public customAttributes: object;
  public groupOptions: GroupSettingsModel;
  public height: string | number;
  public width: string | number;
  public gridLines: GridLine;
  public textWrap: boolean;
  public baseurl: string;
  public commands: CommandModel[];
  public elem: HTMLElement;
  public datePickerObj: DatePicker;
  public nameRules: object;
  public shortnameRules: object;
  public typeRules: object;
  public mohemailRules: object;
  public dirRules: object;
  public value = 'value';
public modelname = "";
  public sortSettings: SortSettingsModel = {
    columns: [{ direction: 'Ascending', field: 'id' }],
  };
  public authtoken: string;
  // public Url = 'api/Clinics';
  @ViewChild('element1') element1: any;
  @ViewChild('grid')
  public grid: GridComponent;
  private routeSub: Subscription;
  private routeSub2: Subscription;
  constructor(
    private titleService: Title,
    private modalService: BsModalService,
    public http: HttpClient,
    private authorize: AuthorizeService,
    private Activatedrouter: ActivatedRoute,
    private router: Router,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private userservice: UsersService,
    @Inject('BASE_URL') baseUrl: string,
    private notificationsService: NotificationsService
  ) {
    this.baseurl = baseUrl;
    this.sub2 = this.userservice.listen().subscribe((e) => {
      //  console.log(e);
      if (e != null) {
        this.grid.clearFiltering();
        this.grid.searchSettings.key = '';
        this.grid.clearSorting();
        this.grid.clearGrouping();
        this.grid.clearSelection();
        this.router.navigate([this.router.url]);
        this.grid.refresh();
        this.grid.filterSettings.columns = [];
      }
    });
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
            if (token !== null) {
              this.authtoken = token;
            }
          })
        )
        .subscribe();
    }
  }
  ngOnInit() {
    this.routeSub = this.Activatedrouter.paramMap.subscribe((params) => {
      this.usertype = Number(params.get('id'));
    });
    this.routeSub2 = this.Activatedrouter.data.subscribe((data: any) => {
      if (data.UsersModel.result) {
        if (this.usertype === 1) {
          this.notificationsService.success('قائمة بكافة  الادارين');
          this.modelname ="الادارين"
          this.titleService.setTitle('أدارة الادارين');
        } else if (this.usertype === 2) {
          this.modelname ="المدرسين"
          this.notificationsService.success('قائمة بكافة  المدرسين');
          this.titleService.setTitle('أدارة المدرسين');
        } else if (this.usertype === 3) {
          this.modelname ="الطلاب"

          this.notificationsService.success('قائمة بكافة  الطلاب');
          this.titleService.setTitle('أدارة الطلاب');
        } else {
          this.notificationsService.error('الرجاء التأكد من البيانات');
          this.router.navigateByUrl('/');
        }
      }
      this.usersModels = data.UsersModel.result;
      this.data = new DataManager({
        json: this.usersModels,
        headers: [
          {
            'X-XSRF-TOKEN': this.xsrf,
            Authorization: `Bearer ${this.authtoken}`,
            withCredentials: true,
          },
        ],
        adaptor: new RemoteSaveAdaptor(),
      });
    });

    this.searchOptions = {
      fields: ['FullName', 'IdNumber', 'email', 'userphone'],
    };
    this.commands = [
      {
        buttonOption: {
          iconCss: 'e-icons e-edit ',
          content: 'تعـديل',
          cssClass: 'e-success',
          click: this.edit.bind(this),
        },
      },
      {
        buttonOption: {
          iconCss: 'e-icons e-delete ',
          content: 'حــذف',
          cssClass: 'e-danger',
          click: this.delete.bind(this),
        },
      },
    ];

    this.editSettings = {
      allowEditing: false,
      allowAdding: false,
      allowDeleting: false,
      mode: 'Dialog',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
    };

    this.toolbarOptions = [
      {
        text: ' أضافة ' ,
        tooltipText: ' أضافة  ',
        prefixIcon: 'e-icons e-plus',
        id: 'adduser',
        align: 'left',
      },
      'ColumnChooser',
      'Search',
      'Print',
      'ExcelExport',
      {
        text: ' تحديث البيانات',
        tooltipText: ' تحديث البيانات',
        prefixIcon: 'e-icons e-ref',
        id: 'clearsearch',
        align: 'Right',
      },
    ];
    this.gridLines = 'Both';
    this.height = 'auto';
    this.width = 'auto';
    this.textWrap = true;
    this.wrapSettings = { wrapMode: 'Both' };
    this.filterSettings = { type: 'FilterBar', mode: 'Immediate' };
    this.groupOptions = { showGroupedColumn: true };
    this.pageSettings = {
      pageSize: 20,
      pageSizes: ['5', '10', '20', '100', '1000'],
      pageCount: 5,
      enableQueryString: true,
    };
    this.customAttributes = { class: 'customcss' };
    this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
  }

  ngAfterViewInit() {
    const animation: Animation = new Animation({
      name: 'FadeIn',
      duration: 2500,
    });
    animation.animate(this.element1.nativeElement, { name: 'SlideLeftIn' });
  }
  public edit(args: any): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(<Element>args.target, '.e-row').getAttribute('data-uid')
    );
    const data = rowObj.data;

    const data2 = JSON.parse(JSON.stringify(data));
    this.selecteduserid = data2.Id;
    this.openeditModalWithComponent(this.selecteduserid);
  }
  public delete(args: any): void {
    const rowObj: IRow<Column> = this.grid.getRowObjectFromUID(
      closest(<Element>args.target, '.e-row').getAttribute('data-uid')
    );
    const data = rowObj.data;

    const data2 = JSON.parse(JSON.stringify(data));
    this.selecteduserid = data2.Id;
    this.opendeleteModalWithComponent(this.selecteduserid);
  }
  rowSelected(args: RowSelectEventArgs) {}

  openeditModalWithComponent(selecteduserid: string) {
    const initialState = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(
      UsereditComponent,
      Object.assign({ initialState })
    );
    this.bsModalRef.content.selecteduserid = selecteduserid;
  }
  opendeleteModalWithComponent(selecteduserid: string) {
    const initialState = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(
      UserdeleteComponent,
      Object.assign({ initialState })
    );
    this.bsModalRef.content.selecteduserid = selecteduserid;
  }

  openModalWithComponent() {
    const initialState = {
      animated: true,
      keyboard: false,
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(
      UsersaddComponent,
      Object.assign({ initialState })
    );
    this.bsModalRef.content.closeBtnName = 'اغلاق';
    this.bsModalRef.content.id = this.usertype;
  }
  public validateRules: (args: { [key: string]: string }) => boolean = (args: {
    [key: string]: string;
  }) => {
    return args[this.value].length >= 3 && args[this.value].length <= 250;
  };

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.type === 'Delete') {
    }
    //
    if (args.target.title === 'Details') {
      const rdata: any = args.rowData;
    }
  }
  public created(args) {
    const grid = this.grid;
    const gridElement = this.grid.element;
    const span = document.createElement('span');
    span.className = 'e-clear-icon';
    span.id = gridElement.id + 'clear';
    span.onclick = this.cancelBtnClick.bind(this);
    gridElement
      .querySelector('.e-toolbar-item .e-input-group')
      .appendChild(span);
    const placeholderVal = 'ابحث هنا';
    gridElement
      .querySelectorAll('.e-filtertext')
      .forEach((r) =>
        r.getAttribute('disabled')
          ? ''
          : r.setAttribute('placeholder', placeholderVal)
      );

    gridElement
      .querySelectorAll('.e-control-wrapper ')
      .forEach((r) =>
        r.lastChild ? r.setAttribute('style', ' border: none') : ''
      );

    const gridid = gridElement.id;
    const st = gridid + '_searchbar';
    const sershinput = gridElement.querySelector('#' + st);
    sershinput.addEventListener('keyup', function (e) {
      grid.searchSettings.key = e.target['value'];
    });
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
  public dataSourceChanged(e: DataSourceChangedEventArgs): void {}
  public dataStateChange(e: DataStateChangeEventArgs): void {}
  public dataSourceChange(e: DataStateChangeEventArgs): void {}

  printComplete() {
    for (const columns of this.grid.columns) {
      if ((columns as Column).field === 'jobs') {
        (columns as Column).visible = true;
      }
      if ((columns as Column).field === 'id') {
        (columns as Column).visible = false;
      }
    }
  }
  toolbarClickHandler(args: ClickEventArgs): void {
    // console.log("toolbarClickHandler", args.item.id)

    if (args.item.id.includes('excelexport')) {
      const excelExportProperties: ExcelExportProperties = {
        exportType: 'CurrentPage',
        fileName: 'new.xlsx',
      };
      this.grid.excelExport(excelExportProperties);
    }
    if (args.item.id.includes('pdfexport')) {
      (this.grid.columns[0] as Column).visible = false;
      (this.grid.columns[5] as Column).visible = false;

      const pdfExportProperties: PdfExportProperties = {
        hierarchyExportMode: 'Expanded',
        fileName: 'new.pdf',
        pageOrientation: 'Landscape',
        pageSize: 'Letter',
        exportType: 'CurrentPage',

        header: {
          fromTop: 0,
          height: 130,
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
      };
      this.grid.pdfExport(pdfExportProperties);
    }

    if (args.item.id === 'expandall') {
      this.grid.groupModule.expandAll();
    }

    if (args.item.id === 'collapseall') {
      this.grid.groupModule.collapseAll();
    }

    if (args.item.id.includes('print')) {
      // console.log('toolbarClickHandler', args.item.id);
      for (const columns of this.grid.columns) {
        if ((columns as Column).field === 'jobs') {
          (columns as Column).visible = false;
        }
        if ((columns as Column).field === 'id') {
          (columns as Column).visible = false;
        }
      }
    }

    if (args.item.id === 'clearsearch') {
      this.grid.clearFiltering();
      this.grid.searchSettings.key = '';
      this.grid.clearSorting();
      this.grid.clearGrouping();
      this.grid.clearSelection();
      this.grid.filterSettings.columns = [];

      this.router.navigate([this.router.url]);
    }

    if (args.item.id === 'adduser') {
      this.openModalWithComponent();
    }
  }
  pdfHeaderQueryCellInfo(args: any): void {
    args.cell.row.pdfGrid.repeatHeader = true;
  }
  pdfQueryCellInfo(args: any): void {}
  pdfExportComplete(): void {
    for (const columns of this.grid.columns) {
      if ((columns as Column).field === 'id') {
        (columns as Column).visible = false;
      }
      if ((columns as Column).field === 'jobs') {
        (columns as Column).visible = true;
      }
    }
  }
  excelQueryCellInfo(args: ExcelQueryCellInfoEventArgs): void {}
  excelExportComplete(): void {}
  actionbegin(args: any) {}
  actionComplete(args: any) {}

  queryCellInfo(args: QueryCellInfoEventArgs) {}

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
  onActionFailure(e: any): void {
    console.log(e);
    if (e.error?.error?.status === 401) {
      this.notificationsService.error('الرجاء اعادة تسجيل الدخول');
      setTimeout(() => {
        this.authorize.signOut('/');
        window.sessionStorage.clear();
        window.localStorage.clear();
        sessionStorage.clear();
        this.router.navigateByUrl('/authentication/logout');
      }, 4000);
      this.router.navigateByUrl('/');
    } else {
      this.notificationsService.error('الرجاء اغلاق المتصفح والمحاولة من جديد');
      this.router.navigateByUrl('/');
    }
  }
  load(args: any) {
    // console.log("load" , args)
  }

  beforeDataBound(args: any) {}

  dataBound(args: any) {
    Object.assign((this.grid.filterModule as any).filterOperators, {
      startsWith: 'contains',
    });
    (this.grid.columns[0] as any).isPrimaryKey = 'true';

    const column: ColumnModel = this.grid.getColumnByField('Id');
    column.isPrimaryKey = true;
  }

  public columnMenuClick(args: MenuEventArgs) {
    if (args.item.id === 'gridclearsorting') {
      this.grid.clearSorting();
    }
  }

  rowDataBound(args: RowDataBoundEventArgs) {}

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.routeSub2) {
      this.routeSub2.unsubscribe();
    }
  }
}
