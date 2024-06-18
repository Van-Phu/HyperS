import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DTOModule, listModule } from '../../shared/dtos/DTOModule.dto';
import { DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  expandDrawer = true;
  listItemsDrawer: DTOModule[] = [];
  selectedItemDrawer: string = '';
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getListItemDrawer();
  }

  // Lấy danh sách item của drawer
  getListItemDrawer() {
    listModule.forEach(module => {
      this.listItemsDrawer.push(module);
      if (module.SubModule) {
        module.SubModule.forEach(subModule => this.listItemsDrawer.push(subModule));
      }
    })
  }

  // Sự kiện chọn vào item drawer
  onSelectItemDrawer(ev: DrawerSelectEvent): void {
    this.selectedItemDrawer = ev.item.ModuleName;
    this.router.navigate([ev.item.RouteLink]);
  }

  
}
