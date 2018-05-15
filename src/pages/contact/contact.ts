import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PlayerPage} from "../player/player";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  toplayer() {
    this.navCtrl.push(PlayerPage)
  }

}
