import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Slides, ModalController} from 'ionic-angular';
import {IndividualProvider} from "../../providers/individual/individual";
import {MediaPlayerProvider} from "../../providers/media-player/media-player";
import {ListSongModalPage} from '../list-song-modal/list-song-modal'

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  index: number;
  @ViewChild(Slides) slides: Slides;
  playlist: Array<object> = [];
  @ViewChild('player') audio: ElementRef;

  constructor(public navCtrl: NavController, public navparams: NavParams, public individual: IndividualProvider, public mPlayer: MediaPlayerProvider, public modalController: ModalController) {
    this.index = navparams.get('index') || 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
    this.individual.getPlayList().then((data) => {
      this.mPlayer.init(this.audio.nativeElement, data, this.slides, this.index);
    });
  }


  ionViewDidEnter() {
    /*在这里初始化ionSlideNextStart的方法，阻止初始化时调用此方法*/
    this.next = (mark) => {
      if (!this.mPlayer.first) {
        this.mPlayer.playNext(mark);
      }
    }
  }

  loop() {
    this.mPlayer.setloop();
  }

  prev(mark) {
    this.mPlayer.playPre(mark);
  }

  play() {
    if (this.mPlayer.playState) {
      this.mPlayer.stop();
    } else {
      this.mPlayer.play();
    }
  }

  next(mark) {

  }

  presentModal() {
    /*查看列表*/
    let modal = this.modalController.create(ListSongModalPage, {mplayer: this.mPlayer});
  /*  modal.onDidDismiss((i) => {
      Number.isInteger(i) && this.mPlayer.skipIndex(i);
    });*/
    modal.present();
  }

  stopUpdate() {
    this.mPlayer.seekStatus = true;
  }

  seek() {
    this.mPlayer.seekFast();
  }

  slideChange() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    let temp = this.slides.getPreviousIndex();
    console.log(temp);
  }

}
