import {Component, EventEmitter, Input, Output} from '@angular/core';


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
  @Output() currentSong = new EventEmitter<any>();

  constructor() {
    console.log('Hello RecommendMusicComponent Component');
  }

  handler(song) {
    this.currentSong.emit(song);
  }
}
