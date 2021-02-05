import {Component, NgZone, ViewChild} from '@angular/core';
import {NavController, Content} from 'ionic-angular';
import {dividerService} from "../../providers/divider/dividerService";
import {mockData} from "../../providers/mockData";
import {KindPlayList} from "../../model/kindPlayList";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  songList: any = {title: '我创建的歌单', options: {count: true, name: true, download: true}};
  collectList: any = {title: '我收藏的歌单', options: {count: true, name: true, creator: true}};
  MVlist: any;
  user: any;

  constructor(public navCtrl: NavController, public ngZone: NgZone, public dividerService: dividerService, public mockData: mockData) {
    /*this.songList = this.mockData.getMySongList();
    this.collectList = this.mockData.getMyCollectList();*/
    this.MVlist = this.mockData.getMyMVList();
    this.user=this.dividerService.user;
  }

  ionViewWillEnter() {
    this.dividerService.getSongMenu(this.user.profile.userId).then((data: KindPlayList) => {
      console.log(data);
      this.songList.playlist = data.me;
      this.collectList.playlist = data.other;
    })
  }

  scrollHandler(event) {
    this.ngZone.run(() => {
        /*todo: sometime event maybe null ,need analyze*/
        /*console.log(event);*/
        this.dividerService.announceScroll(event.directionY);
      }
    )
  }

  scrollFold(top) {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, (dimensions.scrollTop + top - dimensions.contentTop));
  }
}



