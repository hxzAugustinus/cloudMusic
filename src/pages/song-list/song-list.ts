import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {IndividualProvider} from "../../providers/individual/individual";

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
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public individual: IndividualProvider) {
    this.baseInfo = navParams.get('data');
    console.log(this.baseInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SongListPage');
    this.individual.getSongList(this.baseInfo.id).then((data) => {
      console.log(data);
      this.listDetail = data.playlist;
    })
  }

}
