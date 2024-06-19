import { Component, ViewEncapsulation } from '@angular/core';
import { DataModule } from '../../data/moduleHeader';
import { DataSecondContent } from '../../data/dataSecondPages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  dataModuleHeader = DataModule

  constructor(private router: Router){}

  handleSelectActionCenter(action: number){
    this.dataModuleHeader.forEach(element => {
      if(element.id == action){
        element.isSelected = true
      }
      else{
        element.isSelected = false
      }
    });
    // const selectedItem = this.dataModuleHeader.find(item => item.id === action);
    // console.log(selectedItem);
    // if (selectedItem) {
    //   this.router.navigate([selectedItem.route]);
    // }
  }

}
