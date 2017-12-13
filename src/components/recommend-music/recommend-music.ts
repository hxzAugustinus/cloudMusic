import {Component, Input} from '@angular/core';


/**
 * Generated class for the RecommendMusicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recommend-music',
  templateUrl: 'recommend-music.html'
})
export class RecommendMusicComponent {
  @Input() recommendMenu: Array<any>;

  constructor() {
    console.log('Hello RecommendMusicComponent Component');
  }

}
