import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-text-dropdown',
  templateUrl: './text-dropdown.component.html',
  styleUrls: ['./text-dropdown.component.scss']
})
export class TextDropdownComponent {
  @Input() label: string = '';
  @Input() listItem: any[] = [];
  @Input() widthTextBox: number = 250;
  @Input() heightTextBox: number = 30;
  @Input() widthBlock: number = 250;
  @Input() bgColor: string = '#fff';
  @Input() rounded: number = 5;
  @Input() paddingLeft: number;
  @Input() paddingRight: number;
  @Input() boxShadow: string = 'rgba(0, 0, 0, 0.1) 0px 5px 5px';
  @Input() borderWidth: number = 1;
  @Input() borderColor: string = '#B6B6B6';
  @Input() defaultItem: any;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() size: number = 13;
  @Output() getValue = new EventEmitter();

  onClickItem(value: any){
    this.getValue.emit(value);
  }
}
