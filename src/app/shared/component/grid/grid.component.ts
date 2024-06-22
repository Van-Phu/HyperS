import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompositeFilterDescriptor, State } from '@progress/kendo-data-query';
import { GridService } from '../../service/grid.service';
import { Subscription } from 'rxjs';
interface Product {
  ProductID: number;
  ProductName: string;
  SupplierID?: number;
  CategoryID?: number;
  QuantityPerUnit?: string;
  UnitPrice: number;
  UnitsInStock?: number;
  UnitsOnOrder?: number;
  ReorderLevel?: number;
  Discontinued?: boolean;
  Category: {
    CategoryID: number;
    CategoryName: string;
    Description?: string;
  };
}

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
export class GridComponent  implements OnInit, OnDestroy {
  @Input() titleGrid: string = 'Danh sách';
  @Input() isLoading: boolean = false;
  @Input() listData: any[] = [];
  @Input() initState: State = {};
  @Input() listPageSize: number[] = [15, 30, 50, 75];
  @Input() limitButton: number = 3;

  constructor(private gridService: GridService){}

  private subscription: Subscription;
  
  ngOnInit(): void {
    this.getDataFilter();
  }

  // Hàm nhận dataFilter từ component cha thông qua service ngay khi có sự thay đổi
  getDataFilter(){
    this.subscription = this.gridService.filter$.subscribe(data => {
      console.log(data);
    })
  }

  public gridData: Product[] = [
    {
      ProductID: 1,
      ProductName: "Chai",
      UnitPrice: 18,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
      },
    },
    {
      ProductID: 2,
      ProductName: "Chang",
      UnitPrice: 19,
      Category: {
        CategoryID: 1,
        CategoryName: "Beverages",
      },
    },
    {
      ProductID: 3,
      ProductName: "Aniseed Syrup",
      UnitPrice: 10,
      Category: {
        CategoryID: 2,
        CategoryName: "Condiments",
      },
    },
  ];

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
