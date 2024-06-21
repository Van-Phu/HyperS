import { Injectable } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { BehaviorSubject } from 'rxjs';

/**
 * Service chủ yếu dùng để filter cho grid
 */
@Injectable({
    providedIn: 'root'
})
export class GridService {
    private filter = new BehaviorSubject<State>({});
    filter$ = this.filter.asObservable();

    setFilter(state: State) {
        this.filter.next(state);
    }
}
