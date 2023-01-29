import { Component, OnInit, OnDestroy } from '@angular/core';
import { enableRtl } from '@syncfusion/ej2-base';
import { routerTransition } from './router.animations';

import { setTheme } from 'ngx-bootstrap/utils';
import {
  NotificationAnimationType,
  NotificationsService,
  Options,
} from 'angular2-notifications';
import IdleTimer from './shared/IdleTimer';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { Router } from '@angular/router';

enableRtl(true);

// const ajax = new Ajax('/ar-AE.json', 'GET', true);
// ajax.onSuccess = function (value) {
//   L10n.load(value);
//   setCulture('ar-AE');
// };

// ajax.send();
// L10n.load(ar);
// L10n.load({
//   'ar-AE': {
//     grid: {
//       EmptyRecord: 'لا سجلات لعرضها',
//       True: 'صحيح',
//       False: 'خاطئة',
//       InvalidFilterMessage: 'بيانات تصفية غير صالحة',
//       GroupDropArea: 'اسحب رأس العمود هنا لتجميع الاعمدة',
//       UnGroup: 'انقر هنا لإلغاء التجميع',
//       GroupDisable: 'تم تعطيل التجميع لهذا العمود',
//       FilterbarTitle: 'خلية شريط مرشح',
//       EmptyDataSourceError:
//         'يجب ألا يكون DataSource فارغًا عند التحميل الأولي نظرًا لأن الأعمدة يتم إنشاؤها من DataSource في شبكة عمود إنشاء مصدر تلقائي',
//       Add: 'إضافة',
//       Edit: 'تعديل',
//       Cancel: 'إلغاء',
//       Update: 'تحديث',
//       Delete: 'حذف',
//       Print: 'طباعة',
//       Pdfexport: 'تصدير PDF  ',
//       Excelexport: ' تصدير اكسل ',
//       Wordexport: ' تصدير وورد',
//       Csvexport: 'تصدير CSV',
//       Search: 'ابحث هنا',
//       Columnchooser: 'أعمدة',
//       Save: 'حفظ',
//       Item: 'بند',
//       Items: 'العناصر',
//       EditOperationAlert: 'لم يتم تحديد سجلات لعملية التحرير',
//       DeleteOperationAlert: 'لم يتم تحديد سجلات لعملية الحذف',
//       SaveButton: 'حفظ',
//       OKButton: 'حسنا',
//       CancelButton: 'إلغاء',
//       EditFormTitle: 'تفاصيل',
//       AddFormTitle: 'إضافة سجل جديد',
//       BatchSaveConfirm: 'هل أنت متأكد أنك تريد حفظ التغييرات؟',
//       BatchSaveLostChanges:
//         'سيتم فقد التغييرات غير المحفوظة. هل أنت متأكد أنك تريد المتابعة؟',
//       ConfirmDelete: 'هل أنت متأكد أنك تريد حذف اليانات',
//       CancelEdit: 'هل أنت متأكد من أنك تريد إلغاء التغييرات؟',
//       ChooseColumns: 'اختيار العمود',
//       SearchColumns: 'أعمدة البحث',
//       Matchs: 'لم يتم العثور على تطابق',
//       FilterButton: 'البحث',
//       ClearButton: 'مسح البحث',
//       StartsWith: 'ابدا ب',
//       EndsWith: 'ينتهي بـ',
//       Contains: 'يحتوي على',
//       Equal: 'مساو',
//       NotEqual: 'ليس متساوي',
//       LessThan: 'أقل من',
//       LessThanOrEqual: 'اصغر من او يساوي',
//       GreaterThan: 'أكثر من',
//       GreaterThanOrEqual: 'أكبر من أو يساوي',
//       ChooseDate: 'اختيار التاريخ',
//       EnterValue: 'أدخل القيمة',
//       Copy: 'نسخ',
//       Group: 'تجميع حسب هذا العمود',
//       Ungroup: 'فك تجميع بواسطة هذا العمود',
//       autoFitAll: 'احتواء تلقائي لجميع الأعمدة',
//       autoFit: 'احتواء تلقائي لهذا العمود',
//       Export: 'تصدير',
//       FirstPage: 'الصفحة الأولى',
//       LastPage: 'آخر صفحة',
//       PreviousPage: 'الصفحة السابقة',
//       NextPage: 'الصفحة التالية',
//       SortAscending: 'فرز تصاعدي',
//       SortDescending: 'ترتيب تنازلي',
//       EditRecord: 'تحرير السجل',
//       DeleteRecord: 'حذف سجل',
//       FilterMenu: 'البحث',
//       SelectAll: 'اختر الكل',
//       Blanks: 'الفراغات',
//       FilterTrue: 'صحيح',
//       FilterFalse: 'خاطئة',
//       NoResult: 'لم يتم العثور على تطابق',
//       ClearFilter: 'مرشح واضح',
//       NumberFilter: 'عدد المرشحات',
//       TextFilter: 'مرشحات النص',
//       DateFilter: 'مرشحات التاريخ',
//       DateTimeFilter: 'مرشحات DateTime',
//       MatchCase: 'حالة مباراة',
//       Between: 'ما بين',
//       CustomFilter: 'تصفية مخصص',
//       CustomFilterPlaceHolder: 'أدخل القيمة',
//       CustomFilterDatePlaceHolder: 'اختيار موعد',
//       AND: 'و',
//       OR: 'أو',
//       ShowRowsWhere: 'إظهار الصفوف حيث:',
//     },
//     pager: {
//       currentPageInfo: '{0} من {1} صفحة',
//       totalItemsInfo: '( {0}   عناصر)',
//       firstPageTooltip: 'الذهاب إلى الصفحة الأولى',
//       lastPageTooltip: 'الذهاب إلى الصفحة الأخيرة',
//       nextPageTooltip: 'انتقل إلى الصفحة التالية',
//       previousPageTooltip: 'الانتقال إلى الصفحة السابقة',
//       nextPagerTooltip: 'انتقل إلى النداء التالي',
//       previousPagerTooltip: 'الذهاب إلى النداء السابق',
//       pagerDropDown: 'عدد السجلات   لكل صفحة',
//       pagerAllDropDown: 'العناصر',
//       All: 'الكل',
//     },
//   },
// });
// setCulture('ar-AE');

@Component({
  animations: [routerTransition],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authorize: AuthorizeService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
    setTheme('bs4'); // or 'bs4'
  }
  timer: any;

  title = 'برنامج تقيم الطلبة';
  public options: Options = {
    position: ['top', 'center'],
    timeOut: 4000,
    lastOnBottom: true,
    preventDuplicates: true,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    clickIconToClose: true,
    rtl: false,
    animate: NotificationAnimationType.Scale,
  };
  ngOnInit(): void {
    if (this.authorize.isAuthenticated) {
       this.timer = new IdleTimer({
         timeout: 1200, //expired after 10 secs
         onTimeout: () => {
           this.notificationsService.info(
             'سيتم تسجيل خروجك من الموقع لعدم النشاط لمدة 20 دقيقة'
           );
           setTimeout(() => {
             this.authorize.signOut('/');
             this.router.navigateByUrl('/authentication/logout-callback');
           }, 4000);
            // setTimeout(() => {
            //   this.router.navigateByUrl('/authentication/logout-callback');
            // }, 1000);
            // setTimeout(() => {
            //   this.router.navigateByUrl('/Identity/Account/Logout');
            // }, 1000);
         },
       });
    }

  }
  ngOnDestroy() {
    this.timer.clear();
  }
}
