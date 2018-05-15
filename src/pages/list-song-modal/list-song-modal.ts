import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ListSongModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-song-modal',
  templateUrl: 'list-song-modal.html',
})
export class ListSongModalPage {
  mplayer: any = {};

  constructor(public viewController: ViewController, public navParams: NavParams) {
    this.mplayer = this.navParams.get('mplayer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListSongModalPage');
  }

  dismiss() {
    this.viewController.dismiss();
  }

  choose(i){
    this.mplayer.skipIndex(i);
  }

}
