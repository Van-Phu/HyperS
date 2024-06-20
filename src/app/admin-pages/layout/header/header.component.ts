import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  // Lấy giá trị trong searchbar ở header
  getValueSearchHeader(valueSearch: string){
    console.log(valueSearch);
  }
}
