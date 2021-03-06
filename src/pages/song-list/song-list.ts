import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IndividualProvider} from "../../providers/individual/individual";
import {PlayerPage} from "../player/player";

/**
 * Generated class for the SongListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-song-list',
  templateUrl: 'song-list.html',
})
export class SongListPage {
  baseInfo: any;
  listDetail: any | null = {creator: {}};
  @ViewChild('playlist') playlistDiv: ElementRef;
  targetTop: number = 0;
  currentOpacity: number = 100;
  scrollMark: boolean = false;
  checkboxMark: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public individual: IndividualProvider, public ngZone: NgZone) {
    this.baseInfo = navParams.get('data');
    console.log(this.baseInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongListPage');
    this.individual.getSongList(this.baseInfo.id).then((data) => {
      console.log(data);
      this.listDetail = data.playlist;
    })

    this.targetTop = this.playlistDiv.nativeElement.getBoundingClientRect().top;
  }


  handlerScroll(e) {
    this.ngZone.run(() => {
      if (e.scrollTop >= this.targetTop) {
        this.currentOpacity = 0;
        this.scrollMark = true;
        console.log(this.scrollMark);
      } else {
        this.scrollMark = false;
        this.currentOpacity = 100 - 100 * e.scrollTop / this.targetTop;
      }
    })
  }

  multiSelect($event) {
    $event.stopPropagation();
    this.checkboxMark = !this.checkboxMark;
  }

  toPlayList(i = 0) {
    this.individual.setPlayList(this.listDetail.tracks);
    this.navCtrl.push(PlayerPage,{index:i});
  }

  handlerCheck() {
    let arr = this.listDetail.tracks;
    let checks = arr.filter((item) => {
      return item.check;
    });
    console.log(checks);
  }

  ionViewCanLeave(): boolean {
    return !this.checkboxMark;
  }

}
