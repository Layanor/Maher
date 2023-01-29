import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LegendService, TooltipService, DataLabelService,
  CategoryService, LineSeriesService,
  ChartModule, DateTimeService, ScrollBarService,
  ColumnSeriesService, ChartAnnotationService,
  RangeColumnSeriesService, StackingColumnSeriesService,
  BarSeriesService, MultiLevelLabelService, SelectionService, StackingBarSeriesService, ZoomService, CrosshairService, ChartAllModule
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  imports: [ChartAllModule,
    ChartModule,
    CommonModule,
  ],
  declarations: [],
  exports: [
    ChartModule, ChartAllModule
  ],
  providers: [
    ColumnSeriesService, CrosshairService,
    DataLabelService,
    CategoryService,
    LineSeriesService,
    DateTimeService, ScrollBarService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,
    BarSeriesService,
    MultiLevelLabelService, SelectionService, StackingBarSeriesService,
    LegendService,
    TooltipService, ZoomService

  ]
})
export class ChartsModule {
  public static forRoot(): ModuleWithProviders<ChartsModule> {
    return {
      ngModule: ChartsModule,

    };
  }
}

