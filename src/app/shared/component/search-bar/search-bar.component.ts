import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Tìm kiếm theo...';
  @Input() hasIcon: boolean = true;
  @Input() width: number = 300;
  @Input() height: number = 40;
  @Input() bgColor: string = '#fff';
  @Input() color: string = '#000';
  @Input() rounded: number = 100;
  @Input() paddingLeft: number = 30;
  @Input() paddingRight: number = 10;
  @Input() boxShadow: string = 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px';
  @Input() borderWidth: number;
  @Input() borderColor: string;
  @Output() getValue = new EventEmitter();
  valueSearch: string = '';

  // Đẩy dữ liệu nhập vào cho component cha
  sendValueInput() {
    this.getValue.emit(this.valueSearch);
  }

  // Xóa toàn bộ dữ liệu nhập vào
  clearValue() {
    this.valueSearch = ''
  }
}
