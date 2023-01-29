import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[backButton]',
})
export class BackButtonDirective {
  constructor(private location: Location) {}

  @HostListener('click')
  onClick(): void {
    // console.log(this.location['_platformLocation']['_doc']['referrer']);
    // console.log(this.location);

    this.location.back();
  }
}
// Usage:

// <button backButton>BACK</button>
