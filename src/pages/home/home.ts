import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    let io = new IntersectionObserver(entries => {
      console.log(entries[0])
    }, {
      threshold: [0, 1],
      root: document.querySelector('.my-music')
    });

    let node=document.getElementById('example');
    // 开始观察
    io.observe(node);

    /*// 停止观察
    io.unobserve(node);
    // 关闭观察器
    io.disconnect();*/
  }


}
