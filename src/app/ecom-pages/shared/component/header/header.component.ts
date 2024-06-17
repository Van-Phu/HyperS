import { Component } from '@angular/core';
import { DataModule } from './data/moduleHeader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  dataModuleHeader = DataModule
  
}
