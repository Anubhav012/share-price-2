// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DividentEarningSharedService {
  private childDataSubject = new BehaviorSubject<any[]>([]);

  childData$ = this.childDataSubject.asObservable();

  sendChildData(data: any[]) {
    this.childDataSubject.next(data);
  }
}