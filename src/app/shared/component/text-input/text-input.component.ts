import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component cung cấp 1 label và 1 textbox
 * + Chức năng: Sau khi nhập vào textbox và blur ra thì gọi getValue để nhận giá trị
 * - label: là Textbox được mặc định bên trái
 * - widthBlock: là chiều dài từ đầu label cho tới cuối textbox
 * - widthTextBox: là chiều dài của textbox
 * - heightTextBox: là chiều cao của textbox
 * - typeValue: input nhập vô chỉ được là text hay number
 * - Và một số thuộc tính style khác...
 */
@Component({
  selector: 'component-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})

export class TextInputComponent {
  @Input() label: string = 'Textbox';
  @Input() placeholder: string = '';
  @Input() widthBlock: number = 400;
  @Input() widthTextBox: number = 300;
  @Input() heightTextBox: number = 30;
  @Input() bgColor: string = '#fff';
  @Input() color: string = '#000';
  @Input() rounded: number = 5;
  @Input() paddingLeft: number;
  @Input() paddingRight: number = 10;
  @Input() boxShadow: string = 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px';
  @Input() borderWidth: number = 1;
  @Input() borderColor: string = '#B6B6B6';
  @Input() typeValue: 'text' | 'number' = 'number';
  @Output() getValue = new EventEmitter();
  valueTextBox: string = '';

  // Đẩy dữ liệu nhập vào cho component cha
  sendValueTextBox() {
    this.getValue.emit(this.valueTextBox);
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.typeValue === 'number') {
      if (!this.isNumber(event.key)) {
        event.preventDefault();
      }
    }
  }

  isNumber(str: string) {
    return /^\d+$/.test(str);
  }
}
