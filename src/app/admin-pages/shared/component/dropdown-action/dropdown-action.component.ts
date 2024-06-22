import { Component, Input } from '@angular/core';

@Component({
  selector: 'component-dropdown-action',
  templateUrl: './dropdown-action.component.html',
  styleUrls: ['./dropdown-action.component.scss']
})
export class DropdownActionComponent {
  @Input() textStyle: string;
  @Input() fontWeight: number = 600;
  @Input() size: number = 14;
  @Input() text: string = 'Chờ xác nhận';
  @Input() classIconFontAwesome: string = 'fa-plus';
}
