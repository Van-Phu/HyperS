import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component cung cấp nút bao gồm icon và text
 * - classIconFontAwesome: là class của icon thuộc fontAwesome. Ví dụ 'fa-plus'
 * - Và 1 số thuộc tính style khác...
 */
@Component({
  selector: 'component-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() text: string = 'Thêm mới';
  @Input() classIconFontAwesome: string = 'fa-plus';
  @Input() size: number = 14;
  @Input() width: number;
  @Input() height: number;
  @Input() color: string = '#fff';
  @Input() bgColor: string = '#0d6efd';
  @Input() rounded: number = 3;
  @Input() borderWidth: number;
  @Input() borderColor: string;
  @Input() borderStyle: string;
  @Input() paddingVertical: number = 8;
  @Input() paddingHorizontal: number = 12;
  @Input() padding: number;
  @Input() gap: number = 4;
  @Input() boxShadow: string;
  @Input() textStyle: string;
  @Input() fontWeight: number = 600;
  @Input() value: any = '';
  @Input() justify: string = "center";
  @Output() sendValue = new EventEmitter();

  onClickButton(){
    if(this.value || this.value === 0){
      this.sendValue.emit({value: this.value, text: this.text, icon: this.classIconFontAwesome});
    }
  }
}
