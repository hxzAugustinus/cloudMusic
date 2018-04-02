import {Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {Content, ModalController, NavController, NavParams, Slides} from 'ionic-angular';
import {IndividualProvider} from "../../providers/providers/providers";
import {RecommendMusicComponent} from "../../components/recommend-music/recommend-music";
import {RecommendMvComponent} from "../../components/recommend-mv/recommend-mv";
import {ExclusiveMusicComponent} from "../../components/exclusive-music/exclusive-music";
import {sortModal} from "../sort-modal/programe-sort";
import {SongListPage} from "../song-list/song-list";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  /*Dynamic Component Loader */
  entryComponents: [RecommendMusicComponent, RecommendMvComponent, ExclusiveMusicComponent]
})
export class SearchPage {
  /*主要内容区*/
  @ViewChild(Content) content: Content;
  /*选中的slide*/
  currentSlide = 0;
  /*下划线动画样式*/
  lineSlide: string = 'lineSlide0';
  /*首页slides点击控制入口*/
  @ViewChild(Slides) homeSildes: Slides;
  /*轮播*/
  banners: Array<any> = [];
  /*动态组件*/
  programes: Array<any> = [];
  /*动态组件的实例*/
  componentRefes: object = {};
  /*推荐歌单*/
  recommendMenu: Array<any> = [];
  /*独家放送*/
  exclusive: Array<any> = [];
  /*推荐MV*/
  recommendMv: Array<any> = [];
  /*首页动态功能组件的父容器*/
  @ViewChild('programes', {read: ViewContainerRef}) container: ViewContainerRef;
  /*视频*/
  videos: any = {list: []};

  constructor(public navCtrl: NavController, public navParams: NavParams, public Individual: IndividualProvider, private ModalController: ModalController, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter SearchPage');
    this.Individual.getBanner().then((data) => {
      console.log(data);
      this.banners = data;
    });

    this.initParams().then(() => {
      this.Individual.getrecommendMenu().then((data) => {
        console.log(data);
        this.recommendMenu = data;
        this.initProgrames(RecommendMusicComponent, 'recommendMenu', data);
        this.initProgrames(RecommendMusicComponent, 'currentSong', this.handlerSongList, 'event');
      });
      this.Individual.getExclusive().then((data) => {
        console.log(data);
        this.exclusive = data;
        this.initProgrames(ExclusiveMusicComponent, 'exclusive', data);
      });
      this.Individual.getrecommendMv().then((data) => {
        console.log(data);
        this.recommendMv = data;
        this.initProgrames(RecommendMvComponent, 'recommendMv', data);
      })
    });
  }

  /*点击滑动*/
  slideTo(item: number) {
    console.log(item);
    this.homeSildes.slideTo(item);
  }

  /*手势滑动，校正slideNav样式*/
  swipeSlide() {
    let currentIndex = this.homeSildes.getActiveIndex();
    let length = this.homeSildes.length();
    if (currentIndex < length && ('lineSlide' + currentIndex) !== this.lineSlide) {
      this.lineSlide = 'lineSlide' + currentIndex;
      this.initSlides(currentIndex);
    }
  }

  initSlides(i: number) {
    this.currentSlide = i;
    switch (this.currentSlide) {
      case 1:
        this.videos.list.length == 0 && this.initVideos();
        break;
      case 2:

        break;
    }
  }

  /*-----------------音乐--------------------*/
  initParams() {
    return this.Individual.getComponents().then((data) => {
      this.programes = data;
      this.sortProgrames(this.programes);
    });
  }

  /*往容器里按顺序动态创建组件*/
  sortProgrames(components: Array<any>) {
    components.forEach((item) => {
      console.log(item.name);
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(item);
      this.componentRefes[item.name] = this.container.createComponent(componentFactory);
    })
  }

  /*往对应组件里传参数*/
  initProgrames(component: Type<any>, key: string, val: any, type: any = null) {
    if (type && type == 'event') {
      this.componentRefes[component.name].instance[key].subscribe(val);
    } else {
      this.componentRefes[component.name].instance[key] = val;
    }

  }

  onInput(e: any) {
    console.log(e.target.value);
  }


  openSortModal() {
    let modal = this.ModalController.create(sortModal);
    modal.onDidDismiss(() => {
      this.Individual.getComponents().then((data) => {
        this.moveComponent(data);
      })
    });
    modal.present();
  }

  moveComponent(to: Array<any>) {
    /*获取动态组件对应viewRef*/
    let ViewRefs = {};
    this.programes.forEach((item, index) => {
      ViewRefs[item.name] = (this.container.get(index));
    });
    /*获取动态组件目标排序*/
    let targets: Array<any> = [];
    to.forEach((item, index) => {
      targets[item.name] = index;
    });
    /*移动对应的动态组件的viewRef到对应的目标序列*/
    Object.keys(ViewRefs).forEach((item) => {
      this.container.move(ViewRefs[item], targets[item]);
    });
    /*保存排序后的动态组件序列*/
    this.programes = to;
  }

  /*-----------------视频--------------------*/
  initVideos() {
    return this.Individual.getVideos().then((data) => {
      Array.prototype.push.apply(this.videos.list, data.data);
      this.videos.hasMore = data.hasMore;
    })
  }

  doRefresh(refresh: any) {
    setTimeout(() => {
      refresh.complete();
    }, 1000);
  }

  doInfinite(infinite: any) {
    /*
     83   infinite的heright
     607  content的scrollHeight
     10%  infinite 的 threshold
     (83-20)/607>10% ,可以触发infinite,所以设置为20
   */
    this.initVideos().then(() => {
      this.content.scrollTo(0, 20).then(() => {
        infinite.complete();
      });
    })
  }

  /*notice:此函数必须写成arrow function格式，以便this指向SearchPage，若写成非arrow funtion，this=null */
  handlerSongList = (data) => {
    console.log(data);
    this.navCtrl.push(SongListPage, {data:data},{animate:false});
  }

}
