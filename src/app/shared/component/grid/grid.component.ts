import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { State } from '@progress/kendo-data-query';
import { GridService } from '../../service/grid.service';
import { Subscription } from 'rxjs';
import { ColumnComponent, GridComponent } from '@progress/kendo-angular-grid';

/**
 * Cách sử dụng component grid:
 * - Tại component cha chứa grid gọi constructor và khai báo gridService: GridService
 * - Tiếp đó tạo hàm để đẩy state qua cho GridComponet bằng cách gọi hàm setFilter bên trong service
 * - Ngay sau đó GridComponet sẽ nhận được state ngay khi có sự thay đổi ở hàm getDataFilter 
 */
@Component({
  selector: 'component-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponentCustom implements OnInit, OnDestroy, AfterContentInit {
  @Input() titleGrid: string = 'Danh sách';
  @Input() isLoading: boolean = false;
  @Input() listData: any[] = [];
  @Input() initState: State = {};
  @Input() listPageSize: number[] = [15, 30, 50, 75];
  @Input() limitButton: number = 3;
  // @ViewChild('myCustomGrid') public customGrid: GridComponent;
  // @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
  // @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;

  @ViewChild('myCustomGrid') public customGrid: GridComponent;
  @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
  @ContentChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  

  constructor(private gridService: GridService) { }
  ngAfterContentInit(): void {
    console.log(this.columns.toArray());
  }

  private subscription: Subscription;

  ngOnInit(): void {
    this.getDataFilter();
  }

  // Hàm nhận dataFilter từ component cha thông qua service ngay khi có sự thay đổi
  getDataFilter() {
    this.subscription = this.gridService.filter$.subscribe(data => {
      // console.log(data);
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
