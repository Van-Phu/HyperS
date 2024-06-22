import { Component } from '@angular/core';
import { GridService } from 'src/app/shared/service/grid.service';

@Component({
  selector: 'app-admin003-dashboard',
  templateUrl: './admin003-dashboard.component.html',
  styleUrls: ['./admin003-dashboard.component.scss']
})
export class Admin003DashboardComponent {
  constructor(private grid: GridService){}

  getValueSearchGrid(value: any){
    // this.grid.setFilter(value);
    // this.sendDataFilterToGrid();
  }

  // Hàm dùng để gửi data filter cho grid thông qua service
  sendDataFilterToGrid(){
    // this.grid.setFilter({});
  }
}
