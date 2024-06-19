import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private selectedModule = new BehaviorSubject<string>('Quản lý tài khoản/Thông tin người dùng');
  selectedModule$ = this.selectedModule.asObservable();

  setSelectedModule(item: string) {
    this.selectedModule.next(item);
  }
}
