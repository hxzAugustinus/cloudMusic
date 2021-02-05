import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {dividerService} from "../../providers/divider/dividerService";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {
    tel: null,
    pwd: null
  };

  constructor(public navCtrl: NavController, public dividerService: dividerService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.dividerService.login(this.user).then(() => {
      this.navCtrl.setRoot(TabsPage);
    });
  }


}
