import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropOpen]',
})
export class DropOpenDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover') onMouseOver() {
    // console.log('min');
    // const elementCollection = document.getElementById('usernavdrop');
    // const elementCollection = document.getElementsByClassName('navbar');
    this.renderer.addClass(this.el.nativeElement, 'open');
    this.renderer.addClass(this.el.nativeElement, 'show');
    // if (elementCollection[0].clientWidth > 1007) {
    //  this.renderer.addClass(this.el.nativeElement, 'show');
    //  }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'show');
    this.renderer.removeClass(this.el.nativeElement, 'open');
  }
}
