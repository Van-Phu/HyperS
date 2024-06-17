import { Component, ViewEncapsulation } from '@angular/core';
import { DataModule } from './data/moduleHeader';
import { DataSecondContent } from './data/dataSecondPages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  dataModuleHeader = DataModule

}
