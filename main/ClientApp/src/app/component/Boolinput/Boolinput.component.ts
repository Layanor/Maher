import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Boolenvals } from '../../../app/classes/mod';

@Component({
  selector: 'app-boolinput',
  templateUrl: './Boolinput.component.html',
  styleUrls: ['./Boolinput.component.css'],
})
export class BoolinputComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() label1: string;
  @Input() placeholder: string;
  @Input() id: string;
  @Input() vals: any;
  constructor() {}

  ngOnInit() {}
}
