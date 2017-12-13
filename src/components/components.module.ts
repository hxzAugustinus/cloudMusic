import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MyApp} from "../app/app.component";
import {RecommendMusicComponent} from './recommend-music/recommend-music';
import {ExclusiveMusicComponent} from './exclusive-music/exclusive-music';
import {RecommendMvComponent} from './recommend-mv/recommend-mv';

@NgModule({
  declarations: [RecommendMusicComponent,
    ExclusiveMusicComponent,
    RecommendMvComponent],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  exports: [RecommendMusicComponent,
    ExclusiveMusicComponent,
    RecommendMvComponent]
})
export class ComponentsModule {
}
