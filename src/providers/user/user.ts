import {Injectable} from "@angular/core";
import {Api} from "./../api/api";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public http: HttpClient, public api: Api) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('AppUserInfoBLL.Login', accountInfo);

    /*  seq
     .subscribe(res => {
     // If the API returned a successful response, mark the user as logged in
     if (res.success == true) {
     this._loggedIn(res);
     } else {
     }
     }, err => {
     console.error('ERROR', err);
     });*/

    return seq.toPromise().then((data:any) => {
      if (data.Login) {
        this._loggedIn(data);
      }
      return data.data;
    }, err => {
      console.error('Login ERROR', err);
    });

  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo);

    seq.subscribe((res:any) => {
        // If the API returned a successful response, mark the user as logged in
        if (res.success == true) {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.data;
  }
}
