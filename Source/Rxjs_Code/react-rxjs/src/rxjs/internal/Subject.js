import { Observable } from "./Observable";
export class Subject extends Observable {
  observers = []
  _subscribe(subscriber) {
    this.observers.push(subscriber);
  }
  next(value) {
    for (const subscriber of this.observers) {
      subscriber.next(value);
    }
  }
  complete() {
    for (const subscriber of this.observers) {
      subscriber.complete();
    }
  }
}