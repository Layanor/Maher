import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-ngxcharts',
  templateUrl: './ngxcharts.component.html',
  styleUrls: ['./ngxcharts.component.css'],
})
export class NgxchartsComponent implements OnInit {
  animations = true;
  tooltipDisabled = false;
  @Input() view: any[];
  @Input() gradient: boolean;
  @Input() showLegend: boolean;
  @Input() showLabels: boolean;
  @Input() isDoughnut: boolean;
  @Input() label: string;
  @Input() colorScheme: string[];
  @Input() single: any[];
  //
  @Output() Select = new EventEmitter<any>();
  @Output() Activate = new EventEmitter<any>();
  @Output() Deactivate = new EventEmitter<any>();

  ngOnInit(): void {}

  constructor() {
    // Object.assign(this, { single });
    console.log(this);
  }
  onResize(event) {
    //  this.view = [event.target.innerWidth / 3, event.target.innerWidth / 6];
    const elem = document.getElementsByClassName('advanced-pie-legend');
    const chartelem = document.getElementsByClassName('advanced-pie chart');

    const w = event.target.innerWidth / 1.3;
    [].forEach.call(chartelem, function (el) {
      console.log(el);
      if (event.target.innerWidth <= 777) {
        el.style.display = 'none';
        [].forEach.call(elem, function (elleg) {
          elleg.setAttribute('style', 'height:auto');
          elleg.setAttribute('style', 'width:auto');
        }); //  elem[0].setAttribute('style', `width:${w}px !important`);
      } else {
        el.setAttribute('style', 'float:left !important');

        el.style.display = 'block';
      }

      console.log(event.target.innerWidth);
      //  el.setAttribute('style', `width:${w}px !important`);
      // console.log(el.clientWidth);
      // console.log(event.target.innerWidth);
    });

    //  elem.item(0).setAttribute('style', 'widht:555px');
    //  elem.item(1).setAttribute('style', 'widht:555px');
    //  console.log(elem);
    // <NodeListOf<HTMLElement>[]>witth.forEach((e) => {
    //   console.log(e);
    // });
    // for (let i = 0; i < elem.length; i++) {
    //   elem[i].setAttribute('style', 'widht:555px');
    //  console.log(elem[i].clientWidth);
    // }
  }
  onSelectt(data): any {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.Select.emit(data);
  }

  onActivatee(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
    this.Activate.emit(data);
  }

  onDeactivatee(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    this.Deactivate.emit(data);
  }
  // valueFormatting(value: number): string {
  //   return `${Math.round(value).toLocaleString()} `;
  // }
  // onLegendLabelClick(entry) {
  //   console.log('Legend clicked', entry);
  // }

  // pieTooltipText({ data }) {
  //   const label = formatLabel(data.name);
  //   const val = formatLabel(data.value);

  //   return `
  //   <span class="tooltip-label">${escapeLabel(label)}</span>
  //   <span class="tooltip-val">$${val}</span>
  //   `;
  // }
}
// [valueFormatting]="valueFormatting"
// (legendLabelClick)="onLegendLabelClick($event)"
// [tooltipText]="pieTooltipText"
