import {Injectable} from '@angular/core';
import {IndividualProvider} from "../individual/individual";


@Injectable()
export class MediaPlayerProvider {
  audio = null;
  playList: Array<any>;
  slides = null;
  pointer = 0;
  first = true;
  currentSong = null;
  loopState = false;
  playState = false;
  duration = 1;
  currentTime = 0;
  bufferTime = null;
  seekStatus = false;
  curline = 0;
  rdyline = 0;

  constructor(public individual: IndividualProvider) {

  }

  init(audio, playList = [], slides = null, pointer = 0, loopState = false, first = true) {
    this.audio = audio;
    this.playList = playList;
    this.slides = slides;
    this.loopState = loopState;
    this.pointer = pointer;
    this.first = first;
    this.autoplay();
  }

  autoplay() {
    this.currentSong = this.playList[this.pointer];
    this.changeAudio();
    this.audio.loop = this.loopState;
  }

  play() {
    this.playState = true;
    this.audio && this.audio.play();
    this.updateProcess();
  }

  stop() {
    this.playState = false;
    this.audio && this.audio.pause();
  }

  setloop() {
    this.loopState = !this.loopState;
    this.audio.loop = this.loopState;
  }

  updateProcess() {
    let that = this;
    this.audio.ontimeupdate = function () {
      /*原始数据记录*/
      that.currentTime = this.currentTime;
      that.bufferTime = this.buffered;
      that.duration = this.duration;
      /*样式变化*/
      !that.seekStatus && (that.curline = this.currentTime / this.duration * 1000);
      let buffer = that.bufferTime;
      let bufferTime = buffer.length > 0 ? buffer.end(buffer.length - 1) : 0;
      that.rdyline = bufferTime / this.duration * 100;
      that.checkend();
    }

  }

  checkend() {
    if (this.audio.ended && !this.loopState) {
      this.playNext();
    }
  }

  playPre(mark = true) {
    mark && this.slides && this.slides.slidePrev(800, false);
    let temp = --this.pointer;
    this.pointer = temp < 0 ? (this.playList.length - 1) : temp;
    this.currentSong = this.playList[this.pointer];
    this.clearCache();
    this.changeAudio();
  }

  playNext(mark = true) {
    mark && this.slides && this.slides.slideNext(800, false);
    let temp = ++this.pointer;
    this.pointer = temp > (this.playList.length - 1) ? 0 : temp;
    this.currentSong = this.playList[this.pointer];
    this.clearCache();
    this.changeAudio();
  }

  clearCache() {
    this.duration = 1;
    this.currentTime = 0;
    this.bufferTime = null;
    this.curline = 0;
    this.rdyline = 0;
  }

  changeAudio() {
    this.stop();
    this.individual.getAudioUrl(this.currentSong.id).then((data: any) => {
      console.log(data);
      this.first && (this.first = false);
      this.audio.src = data.url;
      setTimeout(() => {
        this.play();
      }, 500);
    })
  }

  seekFast() {
    this.audio.currentTime = this.curline * this.duration / 1000;
    this.seekStatus = false;
  }

  skipIndex(i) {
    if (this.pointer != i) {
      this.slides && this.slides.slideTo(i + 1, 800, false);
      this.pointer = i;
      this.currentSong = this.playList[this.pointer];
      this.clearCache();
      this.changeAudio();
    }
  }
}
