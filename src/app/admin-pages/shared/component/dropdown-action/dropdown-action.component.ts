import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DTOStatus } from '../../dto/DTOStatus.dto';

@Component({
  selector: 'component-dropdown-action',
  templateUrl: './dropdown-action.component.html',
  styleUrls: ['./dropdown-action.component.scss']
})
export class DropdownActionComponent{

  @Input() textStyle: string;
  @Input() fontWeight: number = 600;
  @Input() rounded: number =4;
  @Input() size: number = 14;
  @Input() text: string = 'Chờ xác nhận';
  @Input() classIconFontAwesome: string = 'fa-plus';
  @Input() listItem:DTOStatus[] = [];
  @Output() sendValue = new EventEmitter();
  

  //truyen Output khi click item trong dropdown-action
  onClickItemDropdown(value: any){
    if(value){
      alert(value)
      this.sendValue.emit(value);
    }
  }
}
