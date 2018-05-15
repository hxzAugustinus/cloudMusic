import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {IndividualProvider} from "../../providers/providers/providers";
import {DragulaService} from 'ng2-dragula/ng2-dragula';

/**
 * Generated class for the ProgrameSortPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-programe-sort',
  templateUrl: 'programe-sort.html',
  providers: [DragulaService]
})
export class sortModal {
  programes: Array<any> = [];

  constructor(public ViewController: ViewController, public Individual: IndividualProvider) {
    this.programes = this.Individual.getdynamicalComponent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgrameSortPage');
  }

  dismiss() {
    this.Individual.setdynamicalComponent(this.programes);
    this.ViewController.dismiss(this.programes);
  }

}
