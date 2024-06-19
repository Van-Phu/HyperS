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
  listItemsDrawer: DTOModule[] = listModule;
  selectedItemDrawer: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // Sự kiện khi chọn vào item drawer
  onSelectItemDrawer(item: DTOModule): void {
    if(item.SubModule){
      item.IsExpanded = !item.IsExpanded;
    }
    else{
      this.clearSelectedModule();
      item.IsSelected = true
      this.router.navigate([item.RouteLink]);
    }
  }

  // Sự kiện khi chọn vào submodule
  onSelectSubModule(sub: DTOModule, item: DTOModule): void{
    this.clearSelectedModule();
    item.IsSelected = true;
    sub.IsSelected = true;
    this.router.navigate([sub.RouteLink]);
  }

  // Dùng để xóa IsSelected của từng module
  clearSelectedModule(){
    listModule.forEach(module => {
      module.IsSelected = false;
      if(module.SubModule){
        module.SubModule.forEach(sub => {
          sub.IsSelected = false;
        })
      }
    })
  }

  // Lấy danh sách các module con
  getSubModule(moduleName: string): DTOModule[] | undefined {
    // Tìm module có ModuleName khớp
    const module = listModule.find(mod => mod.ModuleName === moduleName);
    // Kiểm tra nếu module tồn tại và có SubModule
    if (module && module.SubModule) {
      return module.SubModule;
    }
    // Trả về undefined nếu không tìm thấy module hoặc không có subModule
    return [];
  }
}
