import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinerService {
  count = 0;
  constructor(private spinner: NgxSpinnerService) {}
  show() {
    this.count++;
    this.spinner.show(undefined, {
      bdColor: 'rgba(0, 0, 0, 0.8)',
      size: 'large',
      color: '#fff',
      type: this.spinertype(),
      fullScreen: true,
    });
  }
  notshow() {
    this.count--;
    if (this.count <= 0) {
      this.count = 0;
      this.spinner.hide();
    }
  }
  spinertype(): string {
   const all = [
     'square-loader',
     'square-jelly-box',
     'ball-clip-rotate-pulse',
     'ball-climbing-dot',
     'ball-circus',
     'ball-atom',
     'line-scale',
     'fire',
     'ball-clip-rotate-multiple',
     'ball-fussion',
     'ball-grid-beat',
     'ball-grid-pulse',
     'ball-newton-cradle',
     'ball-pulse-rise',
     'ball-rotate',
     'ball-running-dots',
     'ball-scale-pulse',
     'ball-spin-clockwise-fade-rotating',
     'ball-spin-rotate',
   ];
   const random = Math.floor(Math.random() * all.length);
    return all[random];
  }
}
