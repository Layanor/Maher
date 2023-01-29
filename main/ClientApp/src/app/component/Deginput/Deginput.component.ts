import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
interface vals {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-Deginput',
  templateUrl: './Deginput.component.html',
  styleUrls: ['./Deginput.component.css']
})
export class DeginputComponent implements OnInit {
  @Input() control: UntypedFormControl;
  vals: vals[] = [
    { value: 0, viewValue: '0' },
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
