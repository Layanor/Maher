import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-radioinput',
  templateUrl: './RadioInput.component.html',
  styleUrls: ['./RadioInput.component.css'],
})
export class RadioInputComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() label1: string;
  @Input() label2: string;
  @Input() name2: string;
  @Input() id2: string;
  @Input() name1: string;
  @Input() id1: string;
  constructor() {}

  ngOnInit() {}
  handleChange(e) {
   // console.log(e);
    const target = e.target;
    if (target.checked) {
  //    console.log('checked');
    } else {
  //    console.log('unchecked');
    }
  }
}
