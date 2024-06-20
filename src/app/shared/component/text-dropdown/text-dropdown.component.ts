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
  @Input() boxShadow: string = 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px';
  @Input() borderWidth: number = 1;
  @Input() borderColor: string = '#B6B6B6';
  @Input() defaultItem: any;
  @Input() textField: string;
  @Input() valueField: string;
}
