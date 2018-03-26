import {Component, NgZone, ViewChild} from '@angular/core';
import {NavController, Content} from 'ionic-angular';
import {dividerService} from "../../providers/divider/dividerService";
import {mockData} from "../../providers/mockData";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  songList: any;
  collectList: any;
  MVlist: any;

  constructor(public navCtrl: NavController, public ngZone: NgZone, public dividerService: dividerService, public mockData: mockData) {
    this.songList = this.mockData.getMySongList();
    this.collectList = this.mockData.getMyCollectList();
    this.MVlist = this.mockData.getMyMVList();
  }

  scrollHandler(event) {
    this.ngZone.run(() => {
        /*todo: sometime event my be null ,need analyze*/
        /*console.log(event);*/
        event && this.dividerService.announceScroll(event.directionY);
      }
    )
  }

  scrollFold(top) {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, ( dimensions.scrollTop + top - dimensions.contentTop  ));
  }
}



