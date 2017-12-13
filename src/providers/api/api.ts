import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import "rxjs/add/operator/map";

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  /*proxy 配置在ionic.config.json*/
  url: string = "/cloudMusic/";

  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any) {
    if (!params) {
      params = {};
    }

    return this.http.get(this.url + endpoint + this.toQueryString(params));
  }

  post(endpoint: string, body: any) {
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(this.url + endpoint, this.toBodyString(body), {headers: headers});
  }

  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }


  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }


  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}
