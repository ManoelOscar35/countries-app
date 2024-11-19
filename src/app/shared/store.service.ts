import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private country = new BehaviorSubject<object>({});

  setCountry(value: object) {
    this.country.next(value);
  }

  getCountry() {
    return this.country.asObservable();
  }

 
}