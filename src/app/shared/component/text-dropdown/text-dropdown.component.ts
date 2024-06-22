import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-text-dropdown',
  templateUrl: './text-dropdown.component.html',
  styleUrls: ['./text-dropdown.component.scss']
})
export class TextDropdownComponent {
  @Input() label: string = '';
  @Input() listItem: any[] = [];
  @Input() widthTextBox: number = 300;
  @Input() heightTextBox: number = 30;
  @Input() widthBlock: number = 300;
  @Input() bgColor: string = '#fff';
  @Input() rounded: number = 5;
  @Input() paddingLeft: number;
  @Input() paddingRight: number;
  @Input() boxShadow: string = 'rgba(0, 0, 0, 0.15) 0px 5px 15px';
  @Input() borderWidth: number = 1;
  @Input() borderColor: string = '#B6B6B6';
  @Input() defaultItem: any;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() size: number = 15;

}
