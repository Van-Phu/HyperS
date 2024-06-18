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
  isCollapse: boolean = false;
  
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
    const itemModule: DTOModule = ev.item;
    if(itemModule.IsChild){
    }
    // this.router.navigate([ev.item.RouteLink]);
    else{
      itemModule.IsExpanded = !itemModule.IsExpanded;
      if(itemModule.SubModule){
        itemModule.SubModule.forEach(sub => sub.IsExpanded = itemModule.IsExpanded);
      }
    }
    this.selectedItemDrawer = itemModule.ModuleName;
    console.log(this.listItemsDrawer);
  }

  collapseDrawer(){
    this.isCollapse = !this.isCollapse;
  }
}
