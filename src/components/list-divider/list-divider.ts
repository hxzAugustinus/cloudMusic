import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {Divider} from "../../model/divider";
import {dividerService} from "../../providers/divider/dividerService";
import {Subscription} from "rxjs/Subscription";


/**
 * Generated class for the ListDividerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list-divider',
  templateUrl: 'list-divider.html'
})
export class ListDividerComponent {
  divider: Divider = {node: null, position: 'relative', top: 0, foldStatus: false, initTop: 0};
  subscription: Subscription;
  @Output() foldScroll = new EventEmitter<any>();
  @Input() menuList: any = {};

  constructor(public elementRef: ElementRef, public dividerService: dividerService) {
    console.log('Hello ListDividerComponent Component');
    this.divider.node = this.elementRef.nativeElement;
    this.subscription = dividerService.observable.subscribe((direction) => {
      if (!this.divider.foldStatus) {
        let rect = this.divider.node.getBoundingClientRect();
        let rectTop = rect.top - 44;
        let rectHeight = rect.height;
        if (direction == "down" && rectTop < 0) {
          this.divider.position = 'fixed';
          this.divider.top = 44
        }
        if (direction == "down" && (rectHeight + rectTop < 40)) {
          this.divider.position = 'relative';
          this.divider.top = rectHeight - 40;
        }
        if (direction == "up" && (rectHeight + rectTop > 40)) {
          this.divider.position = 'fixed';
          this.divider.top = 44;
        }
        if (rectTop >= 0) {
          this.divider.position = 'relative';
          this.divider.top = 0;
        }
      }
    })
  }

  ngAfterViewInit() {
    console.log(this.elementRef);
  }

  foldHandler() {
    this.divider.foldStatus = !this.divider.foldStatus;
    this.divider.position = 'relative';
    this.divider.top = 0;
    this.foldScroll.emit(this.divider.node.getBoundingClientRect().top)
  }
}
