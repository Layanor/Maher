import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-stringinput',
  templateUrl: './Stringinput.component.html',
  styleUrls: ['./Stringinput.component.css'],
})
export class StringinputComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() type: string;
  @Input() patternmes: string;
  @Input() readonly: boolean;
  constructor() {}

  ngOnInit() {}
}
