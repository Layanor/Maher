import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './TExtArea.component.html',
  styleUrls: ['./TExtArea.component.css'],
})
export class TExtAreaComponent implements OnInit {
  @Input() control: UntypedFormControl ;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
