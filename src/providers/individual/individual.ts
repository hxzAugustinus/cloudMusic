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
  /*当前音乐播放列表（已缓存）*/
  _playList: Array<object> = [];
  /*样例歌曲*/
  defaultPlayer = {};

  constructor(public http: HttpClient, public api: Api, public storage: Storage) {
    console.log('Hello IndividualProvider Provider');
  }

  /*获取轮播列表*/
  getBanner() {
    let seq = this.api.get('banner');
    return seq.toPromise().then((data: any) => {
      console.log(data);
      return data.code == 200 && data.banners;
    }, err => {
      console.error('ERROR', err);
    });
  }

  /*获取推荐歌单*/
  getrecommendMenu() {
    let seq = this.api.get('personalized');
    return seq.toPromise().then((data: any) => {
      console.log(data);
      return data.code == 200 && data.result;
    }, err => {
      console.error('ERROR', err);
    });
  }

  /**/
  getExclusive() {
    let seq = this.api.get('personalized/privatecontent');
    return seq.toPromise().then((data: any) => {
      console.log(data);
      return data.code == 200 && data.result;
    }, err => {
      console.error('ERROR', err);
    });
  }

  /*获取推荐mv*/
  getrecommendMv() {
    let seq = this.api.get('personalized/mv');
    return seq.toPromise().then((data: any) => {
      console.log(data);
      return data.code == 200 && data.result;
    }, err => {
      console.error('ERROR', err);
    });
  }

  /*从storage中读取用户存储动态组件顺序*/
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

  /*获取存储动态组件顺序*/
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

  /*存储动态组件顺序*/
  setdynamicalComponent(data: Array<any>) {
    this._dynamicalComponent = data;
    this.storage.set('_dynamicalComponent', JSON.stringify(data));
  }

  /*获取最新MV列表*/
  getVideos() {
    let seq = this.api.get('top/mv', {
      limit: 10,
      offset: (this.videoState.offset - 1) * 10
    });

    return seq.toPromise().then((data: any) => {
      console.log(data);
      this.videoState.offset++;
      return data.code == 200 && data;
    }, err => {
      console.error('ERROR', err);
    });
  }

  /*获取歌单列表详情*/
  getSongList(id: number) {
    let seq = this.api.get('playlist/detail', {id: id});

    return seq.toPromise().then((data: any) => {
      console.log(data);
      return data.code == 200 && data;
    }, err => {
      console.error('ERROR', err);
    });
  }

  setPlayList(list: Array<Object>) {
    this._playList = list;
    this.storage.set('_playList', JSON.stringify(list))
  }

  getPlayList() {
    if (this._playList.length > 0) {
      return Promise.resolve(this._playList);
    } else {
      return this.getPlayListStorage();
    }
  }

  getPlayListStorage() {
    return this.storage.get('_playList').then((data) => {
      let json = JSON.parse(data);
      if (json) {
        this._playList = json;
      } else {
        this._playList.push(this.defaultPlayer);
      }
      return this._playList;
    })
  }

  getAudioUrl(id: string) {
    let seq = this.api.get('music/url',{id:id});
    return seq.toPromise().then((data: any) => {
      console.log(data);
      return data.code == 200 && data.data[0];
    }, err => {
      console.error('ERROR', err);
    });
  }

}
