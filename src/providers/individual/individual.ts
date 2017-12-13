import {Injectable} from '@angular/core';
import {Api} from "../api/api";
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";
import {RecommendMusicComponent} from "../../components/recommend-music/recommend-music";
import {RecommendMvComponent} from "../../components/recommend-mv/recommend-mv";
import {ExclusiveMusicComponent} from "../../components/exclusive-music/exclusive-music";
import {HttpClient} from "@angular/common/http";

/*
  Generated class for the IndividualProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IndividualProvider {
  /*轮播图*/
  _banner: any;
  /*推荐歌单*/
  _recommendMenu: any;
  /*动态组件*/
  _dynamicalComponent: Array<{ id: number, name: string, component: any }>;
  /*默认排序*/
  defaultOrder: Array<{ id: number, name: string, component: any }> = [
    {id: 1, name: '推荐歌单', component: RecommendMusicComponent},
    {id: 2, name: '推荐MV', component: RecommendMvComponent},
    {id: 3, name: '独家放送', component: ExclusiveMusicComponent}];
  /*视频*/
  videoState: any = {offset: 1};

  constructor(public http: HttpClient, public api: Api, public storage: Storage) {
    console.log('Hello IndividualProvider Provider');
  }

  getBanner() {
    let seq = this.api.get('banner');

    return seq.toPromise().then((data:any) => {
      console.log(data);
      return data.code == 200 && data.banners;
    }, err => {
      console.error('ERROR', err);
    });
  }

  getrecommendMenu() {
    let seq = this.api.get('personalized');

    return seq.toPromise().then((data:any) => {
      console.log(data);
      return data.code == 200 && data.result;
    }, err => {
      console.error('ERROR', err);
    });
  }

  getExclusive() {
    let seq = this.api.get('personalized/privatecontent');

    return seq.toPromise().then((data:any) => {
      console.log(data);
      return data.code == 200 && data.result;
    }, err => {
      console.error('ERROR', err);
    });
  }

  getrecommendMv() {
    let seq = this.api.get('/personalized/mv');

    return seq.toPromise().then((data:any) => {
      console.log(data);
      return data.code == 200 && data.result;
    }, err => {
      console.error('ERROR', err);
    });
  }

  getStorage() {
    return this.storage.get('_dynamicalComponent').then((data) => {
      let json = JSON.parse(data);
      if (json) {
        this._dynamicalComponent = json.map((item) => {
          return this.defaultOrder[item.id - 1];
        })
      } else {
        this._dynamicalComponent = this.defaultOrder;
      }
      return this._dynamicalComponent;
    })
  }

  getComponents() {
    if (this._dynamicalComponent) {
      return Promise.resolve(this._dynamicalComponent.map(item => {
        return item.component
      }))
    } else {
      return this.getStorage().then((data) => {
        return data.map(item => {
          return item.component
        })
      })
    }
  }

  getdynamicalComponent() {
    return this._dynamicalComponent;
  }

  setdynamicalComponent(data: Array<any>) {
    this._dynamicalComponent = data;
    this.storage.set('_dynamicalComponent', JSON.stringify(data));
  }

  getVideos() {
    let seq = this.api.get('top/mv', {
      limit: 10,
      offset: (this.videoState.offset-1)*10
    });

    return seq.toPromise().then((data:any) => {
      console.log(data);
      this.videoState.offset++;
      return data.code == 200 && data;
    }, err => {
      console.error('ERROR', err);
    });
  }
}
