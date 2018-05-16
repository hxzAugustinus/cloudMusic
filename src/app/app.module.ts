import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';
/*page*/
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {SearchPage} from '../pages/search/search';
import {sortModal} from "../pages/sort-modal/programe-sort";
import {TabsPage} from '../pages/tabs/tabs';
import {SongListPage} from "../pages/song-list/song-list";
import {PlayerPage} from '../pages/player/player';
import {ListSongModalPage} from "../pages/list-song-modal/list-song-modal";
import { LoginPage } from "../pages/login/login";
/*plugin*/
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
/*provider*/
import {Api} from '../providers/api/api';
import {User} from '../providers/user/user';
import {IndividualProvider} from '../providers/individual/individual';
import {dividerService} from "../providers/divider/dividerService";
import {ProfileProvider} from '../providers/profile/profile';
/*component*/
import {ComponentsModule} from '../components/components.module';
/*滑动和拖动事件*/
import {DragulaModule} from 'ng2-dragula';
/*模拟数据*/
import {mockData} from "../providers/mockData";
/*管道符*/
import {PipesModule} from "../pipes/pipes.module";
import { MediaPlayerProvider } from '../providers/media-player/media-player';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SearchPage,
    sortModal,
    TabsPage,
    SongListPage,
    PlayerPage,
    ListSongModalPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    DragulaModule,
    PipesModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      activator: 'ripple',
      backButtonText: '',
      pageTransition: 'ios-transition',
      tabsHideOnSubPages: true,
      pageTransitionDelay: 40,
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SearchPage,
    sortModal,
    TabsPage,
    SongListPage,
    PlayerPage,
    ListSongModalPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    User,
    IndividualProvider,
    dividerService,
    mockData,
    ProfileProvider,
    MediaPlayerProvider
  ]
})
export class AppModule {
}
