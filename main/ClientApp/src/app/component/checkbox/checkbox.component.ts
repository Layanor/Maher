import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() label1: string;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
