import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { PageSettingsModel, FilterSettingsModel, EditSettingsModel, GridComponent, ColumnModel, GroupSettingsModel, SortSettingsModel, GridLine, QueryCellInfoEventArgs, RowDataBoundEventArgs, TextWrapSettingsModel, IEditCell, CommandModel, CommandClickEventArgs, Print, ContextMenuItem } from '@syncfusion/ej2-angular-grids';
import { DataManager, Query, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import { DatePicker } from '@syncfusion/ej2-angular-calendars';
import { Animation } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Directorate } from '../../../app/classes/mod';
import { DirService } from './dir.service';
import { map, catchError } from 'rxjs/operators';

import { AuthorizeService } from '../../../api-authorization/authorize.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';




const name = 'XSRF-TOKEN' + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for (var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
    c = c.substring(1);
  }
  if (c.indexOf(name) == 0) {
    var tt = c.substring(name.length, c.length);
    console.log("dir-com-xsrf", tt)
  }
}
/*class CustomAdaptor extends UrlAdaptor {
  beforeSend(dm: DataManager, request: XMLHttpRequest) {
     request.open('POST', 'api/Directorates/UrlDatasource');                                    // customizing the Url of lHttpRequest
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
   dm.dataSource.headers = [{ 'Authorization': 'bearertoken1111' }];  // setting header
 }
}  */
@Component({
  selector: 'app-dir',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css'],
})
export class DirComponent implements OnInit {
  constructor(private dirser: DirService, private authorize: AuthorizeService,
        private router: Router,
    private notificationsService: NotificationsService,
    ) {
    // this.dirser.getall().subscribe((d: Directorate[]) => {
    //   console.log(d)
    //   this.dir = d
    // });
  }
  public contextMenuItems: ContextMenuItem[];
  public pageSettings: PageSettingsModel;
  public filterSettings: FilterSettingsModel;
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
  public dpParams: IEditCell;
  public commands: CommandModel[];
  public elem: HTMLElement;
  public datePickerObj: DatePicker;
  public nameRules: object;
  public shortnameRules: object;
  public value = 'value';
  public sortSettings: SortSettingsModel = {
    columns: [{ direction: 'Ascending', field: 'id' }],
  };
  public authtoken: string;

  @ViewChild('element1') element1: any;
  @ViewChild('grid')
  public grid: GridComponent;

  /*  getdata() {
     return this.dirser.getall().pipe(
       map(
         (d:Directorate[]) => {
           this.grid.dataSource = new DataManager({
             json: d,
             adaptor: new RemoteSaveAdaptor(),
             insertUrl: '/Home/Insert',
             updateUrl: '/Home/Update',
             removeUrl: '/Home/Delete',
           });
         }),
       catchError((error) => {
         console.log('error ' + error);
         throw error;
       })
       // users => this.users = users,
       // error => this.errorMsg = <any>error);
     )

   } */
  public Url = 'api/Directorates';
  ngOnInit(): void {
    this.authorize
      .getAccessToken()
      .pipe(
        map((token) => {
          console.log('dir-com-auth', token);
          if (token != null) {
            this.authtoken = token;
          }
        })
      )
      .subscribe();
    this.dirser
      .getall(this.Url)
      .pipe(
        map((d: Directorate[]) => {
          this.grid.dataSource = new DataManager({
            json: d,
            headers: [
              { 'X-XSRF-TOKEN': tt, Authorization: `Bearer ${this.authtoken}` },
            ],
            adaptor: new RemoteSaveAdaptor(),
            insertUrl: '/api/Directorates/Insert',
            updateUrl: '/api/Directorates/Update',
            removeUrl: '/api/Directorates/Delete',
          });
          // headers = [{ 'X-XSRF-TOKEN': "tt" }],
        }),
        catchError((error) => {
          console.log('error123 ' + error);
          throw error;
        })
        // users => this.users = users,
        // error => this.errorMsg = <any>error);
      )
      .subscribe(
        (x) => {
          console.log('Observer got a next value: ' + x);
        },
        (err) => {
          console.error('Observer got an error: ' + err);
        }
        //  () => {console.log('Observer got a complete notification')}
      );

    /*     this.getdata().subscribe((e) => {
          console.log('ngOnit after getUsers() ' + e);

        }); */

    // this.data2 = this.dataManager;

    //  this.data = new DataManager(data as JSON[]).executeLocal(new Query().take(8));

    // this.data2 = new DataManager({
    //   url: 'https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders',
    //   adaptor: new ODataAdaptor(),
    //   // offline: true

    // }),

    /*  this.data = new DataManager({
       json: [],
       adaptor: new RemoteSaveAdaptor(),
     }); */
    // this.query = new Query().addParams('ej2grid', 'true');

    this.commands = [
      {
        type: 'Edit',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' },
      },
      {
        type: 'Delete',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' },
      },
      {
        type: 'Save',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' },
      },
      {
        type: 'Cancel',
        buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' },
      },
      //{ title: "Details", buttonOption: { content: 'Details', cssClass: 'e-flat', } }
    ];

    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog',
      showDeleteConfirmDialog: true,
      showConfirmDialog: true,
    };

    this.toolbarOptions = [
      'ColumnChooser',
      'Search',
      'PdfExport',
      'Add',
      'Edit',
      'Delete',
      'Update',
      'Cancel',
      'Print',
      'ExcelExport',
      'WordExport',
      {
        text: 'مسح البحث',
        tooltipText: 'مسح البحث',
        prefixIcon: 'fab fa-searchengin',
        id: 'clearsearch',
        align: 'Right',
      },
    ];

    /* List<object> toolbarItems = new List<object>();
    toolbarItems.Add(new { text = "Expand All", tooltipText = "Expand All", prefixIcon = "e-expand", id = "expandall" });
    toolbarItems.Add(new { text = "Collapse All", tooltipText = "Collapse All", prefixIcon = "e-collapse", id = "collapseall", align = "left" });
    toolbarItems.AddRange(new List<string>() { "ColumnChooser", "ExcelExport", "PdfExport", "CsvExport", "Print", "Search" });
    toolbarItems.Add(new { text = "مسح البحث", tooltipText = "Clear Search", prefixIcon = "e-coll", id = "Click" });
   */
    /*   List<object> commands = new List<object>();
      commands.Add(new { type = "userstatus", buttonOption = new { content = "تعديل", iconCss = "e-icons e-edit", cssClass = "e-flat" } }); // custom */
    this.gridLines = 'Both';
    this.height = 'auto';
    this.width = 'auto';
    this.textWrap = true;

    this.wrapSettings = { wrapMode: 'Content' };

    this.filterSettings = { type: 'FilterBar', mode: 'Immediate' };

    this.groupOptions = { showGroupedColumn: true };

    this.pageSettings = { pageSize: 20 };

    this.customAttributes = { class: 'customcss' };

    this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };

    this.nameRules = {
      required: [this.requiredvalidateRules, ' الرجاء كتابة اسم المديرية '],
      minLength: [
        this.validateRules,
        'اسم المديرية لا يقل عن 3 حروف ولا  يزيد عن 250 حرف',
      ],
    };

    this.shortnameRules = {
      required: [
        this.requiredvalidateRules,
        ' الرجاء كتابة اسم المديرية المختصر ',
      ],
      minLength: [
        this.validateRules,
        'اسم المديرية المختصر لا يقل عن 3 حروف ولا  يزيد عن 250 حرف',
      ],
    };

    this.dpParams = { params: { value: new Date() } };

    this.contextMenuItems = [
      'AutoFit',
      'AutoFitAll',
      'SortAscending',
      'SortDescending',
      'Copy',
      'Edit',
      'Delete',
      'Save',
      'Cancel',
      'PdfExport',
      'ExcelExport',
      'CsvExport',
      'FirstPage',
      'PrevPage',
      'LastPage',
      'NextPage',
    ];
  }
  ngAfterViewInit() {
    let animation: Animation = new Animation({
      name: 'FadeIn',
      duration: 2500,
    });
    animation.animate(this.element1.nativeElement, { name: 'SlideLeftIn' });
    // animation.animate(this.element2.nativeElement, { name: 'ZoomOut' });
  }

  public valueAccess = (field: string, data1: object, column: object) => {
    /*   const ShipRegion = 'ShipName';
      return data1[field] + '-' + data1[ShipRegion]; */
    return 'الاسم المختصر ' + ' : ' + data1[field];
  };

  public valueAccess2 = (field: string, data: object, column: object) => {
    return data[field]
      .map((s: { FirstName: string; LastName: string }) => {
        return s.LastName || s.FirstName;
      })
      .join(' ');
  };

  public valueAccess3 = (
    field: string,
    data: { Protein: number; Fat: number; Carbohydrate: number },
    column: Object
  ): number => {
    return data.Protein * 4 + data.Fat * 9 + data.Carbohydrate * 4;
  };

  public validateRules: (args: { [key: string]: string }) => boolean = (args: {
    [key: string]: string;
  }) => {
    return args[this.value].length >= 3 && args[this.value].length <= 250;
  };
  public requiredvalidateRules: (args: { [key: string]: string }) => boolean =
    (args: { [key: string]: string }) => {
      return args[this.value].length > 0;
    };
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
  };

  toolbarClickHandler(args: ClickEventArgs): void {
    if (args.item.id === 'clearsearch') {
      this.grid.clearFiltering();
      this.grid.searchSettings.key = '';
              this.grid.filterSettings.columns = [];

      // this.grid.filterModule.
      // this.grid.search('');
    }

    if (args.item.id === 'collapseall') {
      this.grid.groupModule.collapseAll();
    }
  }

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

  commandClick(args: CommandClickEventArgs): void {
    //
    if (args.target.title === 'Details') {
      // const rdata:any =JSON.stringify(args.rowData)
      const rdata: any = args.rowData;
      console.log(rdata.id);
    }
  }

  load(args: any) {
    // this.grid.dataSource = new DataManager({
    //   json: this.dir,
    //   adaptor: new RemoteSaveAdaptor(),
    //   insertUrl: '/Home/Insert',
    //   updateUrl: '/Home/Update',
    //   removeUrl: '/Home/Delete',
    // });
    //  console.log("load" + JSON.stringify(args))
  }

  dataSourceChange(e) {
    //  console.log("dataSourceChange" + JSON.stringify(e))
    //this.grid.refresh();
  }

  actionbegin(args: any) {
    /*   console.log("actionbeg", args)
      let x = header.get('XSRF-TOKEN')
      console.log(x) */
  }
  actionComplete(args: any) {
    if (
      args.requestType == 'filterafteropen' &&
      args.columnName == 'EnterDateTime'
    )
      args.filterModel.dlgObj.element.querySelector('.e-flm_optrdiv').hidden =
        true;
    /*  console.log("actionComplete", args) */
  }
  beforeDataBound(args: any) {
    // this.grid.dataSource = new DataManager({
    //   json: this.dir.result,
    //   adaptor: new RemoteSaveAdaptor(),
    //   insertUrl: '/Home/Insert',
    //   updateUrl: '/Home/Update',
    //   removeUrl: '/Home/Delete',
    // });
    //  console.log("beforeDataBound" + args)
  }

  dataBound(args: any) {
    /*   this.grid.dataSource = new DataManager({
        json: this.dir.result,
        adaptor: new RemoteSaveAdaptor(),
        insertUrl: '/Home/Insert',
        updateUrl: '/Home/Update',
        removeUrl: '/Home/Delete',
      }); */
    Object.assign((this.grid.filterModule as any).filterOperators, {
      startsWith: 'contains',
    });
    (this.grid.columns[0] as any).isPrimaryKey = 'true';
    // or
    const column: ColumnModel = this.grid.getColumnByField('id');
    column.isPrimaryKey = true;
    column.width = 3000;

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
  }

  public columnMenuClick(args: MenuEventArgs) {
    if (args.item.id === 'gridclearsorting') {
      this.grid.clearSorting();
    }
  }

  customiseCell(args: QueryCellInfoEventArgs) {
    if (args.column.field === 'Freight') {
      //if (args.data[args.column.field] < 30) {
      //  args.cell.classList.add('below-30');
      //} else if (args.data[args.column.field] < 80) {
      //  args.cell.classList.add('below-80');
      //} else {
      //  args.cell.classList.add('above-80');
      //}
    }
  }

  /*   showColumnChooser() {
      this.grid.columnChooserModule.openColumnChooser(200, 50); // give X and Y axis
    } */

  rowDataBound(args: RowDataBoundEventArgs) {
    const OrderID = 'OrderID';
    if (args.data[OrderID] === 10249) {
      args.rowHeight = 90;
    }
    const Freight = 'Freight';
    if (args.data[Freight] < 30) {
      args.row.classList.add('below-30');
    } else if (args.data[Freight] < 80) {
      args.row.classList.add('below-80');
    } else {
      args.row.classList.add('above-80');
    }
  }

  /*  // UrlAdaptor
   public dataManager: DataManager = new DataManager({
      url: 'api/Directorates/UrlDatasource',
      updateUrl: 'api/Directorates/Update',
      insertUrl: 'api/Directorates/Insert',
      removeUrl: 'api/Directorates/Delete',
      adaptor:  new UrlAdaptor(),

      // headers: [{'cookie': '.AspNetCore.Identity.Application=CfDJ8OSKeSf-UtNEqcQCGZk-P2Ur7Wi1_5poFak6RTYjhp44gJWRdoczMIcoe_z4MqDtd34qkupJ1EzExELHhadyXgTi_1JsmrUAqEF3HBJpB5zMbbzpyKxWP4OshB7IXQGJwsz3fwBeDQ4EpxWT-t3nczxHRU1hLBLmwbpwRalmvYwjKbSIP3gfnnEEVWCA4LG1frYATesOeQnLkPeCusOZioN3ukbR-ceIPr_zfvLbONvuAidTB89SN105Ap28J_Bd1cPC3P80fFidGbmnRLjmoAeosqEgLsMDQ7LLJ0mPrtTEcYX-sEIq9s7j6vf4-IbJdWB-yqXu8vIrjXLCl4iJDLjUs468c-8APsSsDUao_MvMYtR3nNkmnji3fP8bocwkNMqn-xPaqNDp1ItRiRXo_VI-XClIB7bvr4xsYDlqmXa0ComiXlZF35NBJzK61NMiuroB6MfWDmUphZtekm6XZvSxeQJwRX6gf7fbotKaMbnBsOZw2YuNSfOeegNGS18Zs_yOgmRqRq-NOzqDW3PM7DwjYxGLFf9YG2BTmJVxCrp_0A7fZtZyMTgTGRuNqqyM5aHsCyljTp6B8xR29sKV-KZEjGZ9b5mDp63Z1DOjxEoPcossYBzOHhFtVIOb4ndJB5o83WAeXXqLeGseGJkOfvwegN2vwYGUXXKJPwIg9YrG2eyGByx8UAwhZ5LEWw7p9aI8OcSUu1w6hDUFhVAW43-i13V3GARGuY8Oa55dINFMFQKXDqUWWAg69rXIoX0X2xtdYZNz4Pcvydi6l6K_2ZW4wgs5Auh_2DzWW4tmnROcnsn_By_svhcFv7r-QcCGMLJa3c1RNJrU29LC10r4WE8SHRJXrliY-3SLwZGMSNtb6xEJ6M8oOXCLbOZkI5bt76T9_ycxVWaOVdxoHrJKwjK12XQS6_70RkucZYebgGMU66VITombAZKYYbWkx4SVSBO-FbLTwV5PIAZBeVU6dV90NxwXBfgy6lXou_Y9NyTL'},
      //   { 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRldmVsb3BtZW50IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE1Nzc0Njg0MDIsImV4cCI6MTU3NzQ3MjAwMiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6ImMzMWE4QVBJIiwiY2xpZW50X2lkIjoiYzMxYTgiLCJzdWIiOiI0NWY1YTZmOC1iNDQyLTQyYzEtYmFkOC0xYmI3ZGE0MTYyNDMiLCJhdXRoX3RpbWUiOjE1Nzc0MzE5MzEsImlkcCI6ImxvY2FsIiwicm9sZSI6WyJNdWRlciIsIlN1cGVyTXVkZXIiXSwibmFtZSI6IkFkbWluIGZpcnN0Iiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGUiLCJjMzFhOEFQSSJdLCJhbXIiOlsicHdkIl19.yfgVZ1fFUpzB1yQWlP2Sr9yrX1DlGD2t0LMsRWVkPP7CwTlNPyAmHoqfm1fTxYfn20WMhUotYg14hsaegYtZ7lo7mQcZnX0hlZmD1DwZcPhh_AIZVWnkq84pzFWcxDAEis5b4hrpmCSQvL7mK2dyTdUTp8boOjKkylynb1mWmqxbpPNQxSWLSM2suTzN-4uAKLCzdGYBu_z2Pwgbv71M-5smiFUYBLuk6tGiQWKkawHaq6WcAP6TSnA95bp0zjJsvcW7WNuPI-WJK4Yxoztgezr2-F5rznouNCM8NQxFD05HDXjBOTtj8Rhlcl6X9Nggx5bh0FOrRE82hbWCGGHS3g' }] ,

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
}
