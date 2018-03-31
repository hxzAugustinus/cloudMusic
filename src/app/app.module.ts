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
/*plugin*/
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {IonicStorageModule} from '@ionic/storage';
/*provider*/
import {Api} from '../providers/api/api';
import {User} from '../providers/user/user';
import {IndividualProvider} from '../providers/individual/individual';
/*component*/
import {ComponentsModule} from '../components/components.module';
/*滑动和拖动事件*/
import {DragulaModule} from 'ng2-dragula';
import {dividerService} from "../providers/divider/dividerService";
import {mockData} from "../providers/mockData";
import { ProfileProvider } from '../providers/profile/profile';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    DragulaModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios'
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
    ProfileProvider
  ]
})
export class AppModule {
}
