import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SearchPage } from "../search/search";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab0Root = SearchPage;
  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = AboutPage;

  constructor(public navCtrl:NavController) {

  }
}
