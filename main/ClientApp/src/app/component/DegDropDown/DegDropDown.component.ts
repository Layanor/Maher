import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { vals } from '../../../app/classes/mod';

@Component({
  selector: 'app-dropdown',
  templateUrl: './DegDropDown.component.html',
  styleUrls: ['./DegDropDown.component.css'],
})
export class DegDropDownComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() readonly = false;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() vals: any;
  @Output() public ngModelChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
  onChange(value) {
    this.ngModelChange.emit(value);
  }
}
