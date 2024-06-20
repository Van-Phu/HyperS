import { Component } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderAdminComponent {

  // Lấy giá trị trong searchbar ở header
  getValueSearchHeader(valueSearch: string){
    console.log(valueSearch);
  }
}
