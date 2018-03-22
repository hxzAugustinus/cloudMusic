import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";


@Injectable()
export class dividerService {
  private scrollStep = new Subject<string>();
  observable = this.scrollStep.asObservable();

  constructor() {
  }

  announceScroll(direction: string) {
    this.scrollStep.next(direction);
  }
}
