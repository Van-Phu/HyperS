import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private selectedBreadcrumb = new BehaviorSubject<string>(localStorage.getItem('breadcrumb'));
  selectedBreadcrumb$ = this.selectedBreadcrumb.asObservable();
  private selectedModule = new BehaviorSubject<string>(localStorage.getItem('moduleName'));
  selectedModule$ = this.selectedModule.asObservable();

  setSelectedBreadCrumb(item: string) {
    this.selectedBreadcrumb.next(item);
  }

  setSelectedModule(item: string) {
    this.selectedModule.next(item);
  }
}
