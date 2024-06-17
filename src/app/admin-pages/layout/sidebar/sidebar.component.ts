import { SVGIcon, bellIcon, calendarIcon, envelopeLinkIcon, inboxIcon, menuIcon, starOutlineIcon, userIcon,  } from '@progress/kendo-svg-icons';
import { Component, ViewEncapsulation } from '@angular/core';
import { DTOModule, listModule } from '../../shared/dtos/DTOModule.dto';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  open: boolean = false;
  public expanded = false;

  public items: DrawerItem[] = [
    { text: "Inbox", svgIcon: userIcon },
    { text: "Notifications", svgIcon: bellIcon },
  ];
}
