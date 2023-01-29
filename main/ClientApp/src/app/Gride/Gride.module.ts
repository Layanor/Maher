import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GridAllModule,
  PageService,
  SortService,
  FilterService,
  GroupService,
  CommandColumnService,
  ResizeService,
  SearchService,
  ExcelExportService,
  PdfExportService,
  ForeignKeyService,
  ReorderService,
  ColumnChooserService,
  ToolbarService,
  ColumnMenuService,
  EditService,
  ContextMenuService,
  FreezeService,
} from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  CalendarModule,
  DatePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';
import {
  DropDownListAllModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { GrideComponent } from './gride.component';
import { SgrideComponent } from './sgride/sgride.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    RouterModule,
    CalendarModule,
    DatePickerAllModule,
    DropDownListAllModule,
    CommonModule,
    GridAllModule,
    DropDownListModule,
  ],
  declarations: [GrideComponent, SgrideComponent],
  exports: [
    DropDownListAllModule,
    CalendarModule,
    RouterModule,
    GridAllModule,
    ButtonModule,
    DatePickerAllModule,
    DropDownListModule,
    GrideComponent,
  ],
  providers: [
    FreezeService,
    ContextMenuService,
    EditService,
    PageService,
    SortService,
    FilterService,
    GroupService,
    CommandColumnService,
    ResizeService,
    ToolbarService,
    ColumnChooserService,
    ReorderService,
    SearchService,
    PdfExportService,
    ExcelExportService,
    ForeignKeyService,
    ColumnMenuService,
  ],
})
export class GrideModule {
  public static forRoot(): ModuleWithProviders<GrideModule> {
    return {
      ngModule: GrideModule,
      providers: [],
    };
  }
}
