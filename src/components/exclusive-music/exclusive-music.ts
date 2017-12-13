import { Component ,Input } from '@angular/core';

/**
 * Generated class for the ExclusiveMusicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'exclusive-music',
  templateUrl: 'exclusive-music.html'
})
export class ExclusiveMusicComponent {

  text: string;

  @Input() exclusive:Array<any>;

  constructor() {
    console.log('Hello ExclusiveMusicComponent Component');
    this.text = 'Hello World';
  }

}
