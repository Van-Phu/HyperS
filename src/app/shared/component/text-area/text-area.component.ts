import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'component-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() value: string;
  @Input() maxlength = 100;
  @Input() bgColor: string = "#fff";
  @Input() color: string ="#000";
  @Input() colorLabel: string ="#000";
  @Input() width: number = 250;
  @Input() height: number = 60;
  @Input() borderWidth: number = 1;
  @Input() borderColor: string ="#B6B6B6";
  @Input() borderStyle: string = "solid";
  @Input() placeholder: string = "Vui lòng nhập...";
  @Input() labelWidth: number = 80;
  @Input() rounded: number = 5;
  @Input() label: string = 'Tiêu đề';
  @Output() valueTextArea = new EventEmitter();

  // blur ra rồi emit
  
}