import { Directive, SimpleChanges, ElementRef, Input, Renderer } from '@angular/core';
import { Content } from 'ionic-angular';

@Directive({
  selector: '[scroll-hide]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class ScrollHideDirective {

  header: any;
  headerHeight: any;
  translateAmt: any;

  constructor(public element: ElementRef, public renderer: Renderer) {

  }

  ngAfterViewInit() {
    this.header = document.getElementsByClassName("shrink")[0];
    this.headerHeight = this.header.clientHeight;
  }

  onContentScroll(ev) {
    ev.domWrite(() => {
      this.updateHeader(ev);
    });
  }

  updateHeader(ev) {

    if (ev.scrollTop >= 0) {
      this.translateAmt = -ev.scrollTop / 4;

    } else {
      this.translateAmt = ev.scrollTop / 4;
    }

    this.renderer.setElementStyle(this.header, 'webkitTransform', 'translate3d(0,' + this.translateAmt + 'px,0)');

  }
}