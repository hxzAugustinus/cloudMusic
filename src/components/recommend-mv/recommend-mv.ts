import { Component ,Input } from '@angular/core';

/**
 * Generated class for the RecommendMvComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recommend-mv',
  templateUrl: 'recommend-mv.html'
})
export class RecommendMvComponent {

  text: string;
  @Input()  recommendMv:Array<any>;

  constructor() {
    console.log('Hello RecommendMvComponent Component');
    this.text = 'Hello World';
  }

}
