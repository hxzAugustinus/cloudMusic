import {Injectable} from "@angular/core";

@Injectable()
export class mockData {

  getMySongList() {
    return {
      title: '我创建的歌单',
      list: [
        {id: 1, name: 'song1'},
        {id: 2, name: 'song2'},
        {id: 3, name: 'song3'},
        {id: 4, name: 'song4'},
        {id: 5, name: 'song5'},
        {id: 6, name: 'song6'},
        {id: 7, name: 'song7'},
        {id: 8, name: 'song8'},
        {id: 9, name: 'song9'},
        {id: 10, name: 'song10'},
      ]
    }
  }

  getMyCollectList() {
    return {
      title: '我收藏的歌单',
      list: [
        {id: 11, name: 'song11'},
        {id: 12, name: 'song12'},
        {id: 13, name: 'song13'},
        {id: 14, name: 'song14'},
        {id: 15, name: 'song15'},
        {id: 16, name: 'song16'},
        {id: 17, name: 'song17'},
        {id: 18, name: 'song18'},
        {id: 19, name: 'song19'},
        {id: 20, name: 'song20'},
      ]
    }

  }

  getMyMVList() {
    return {
      title: '我收藏的MV',
      list: [
        {id: 11, name: 'mv11'},
        {id: 12, name: 'mv12'},
        {id: 13, name: 'mv13'},
        {id: 14, name: 'mv14'},
        {id: 15, name: 'mv15'},
        {id: 16, name: 'mv16'},
        {id: 17, name: 'mv17'},
        {id: 18, name: 'mv18'},
        {id: 19, name: 'mv19'},
        {id: 20, name: 'mv20'},
      ]
    }

  }

}
