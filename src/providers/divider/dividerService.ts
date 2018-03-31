import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {HttpClient} from "@angular/common/http";
import {Api} from "../api/api";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/toPromise";
import {KindPlayList} from "../../model/kindPlayList";
import {Storage} from '@ionic/storage';


@Injectable()
export class dividerService {
  private user: any;
  private scrollStep = new Subject<string>();
  observable = this.scrollStep.asObservable();

  constructor(public http: HttpClient, public api: Api, public storage: Storage) {

  }

  announceScroll(direction: string) {
    this.scrollStep.next(direction);
  }


  login() {
    let seq = this.api.get('login/cellphone', {phone: 13638682603, password: 'hxz19910823'});
    return seq.toPromise().then((data: any) => {
      return data.code == 200 && this.setUser(data);
    }, err => {
      console.error('ERROR', err);
    });
  }

  getSongMenu() {
    return this.getUser().then(() => {
      let seq = this.api.get('user/playlist', {uid: this.user.profile.userId});
      return seq.toPromise().then((data: any) => {
        return data.code == 200 && this.separateKind(data.playlist);
      }, err => {
        console.error('ERROR', err);
      });
    })
  }


  setUser(data: any) {
    this.user = data;
    this.storage.set('userProfile', data);
  }

  getUser() {
    return this.storage.get('userProfile').then((data) => {
      let json = data;
      if (json) {
        this.user = json;
        return Promise.resolve(json);
      } else {
        return this.login();
      }
    })
  }

  separateKind(arr: Array<any>): KindPlayList {
    let res = {me: [], other: []};
    arr.forEach((item) => {
      if (item.creator.userId === this.user.profile.userId) {
        res.me.push(item);
      } else {
        res.other.push(item);
      }
    });
    return res;
  }

}
