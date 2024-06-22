import { AfterContentInit, Component, ContentChild, ElementRef, Input } from '@angular/core';

/**
 * 
 */
@Component({
  selector: 'component-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent{
  @Input() widthPopUp: number = 370;
  @Input() heightPopUp: number = 238;
  @Input() color: string = "#09880E";
  @Input() fontWeightHeader: number = 600;
  @Input() fontSizeHeader: number = 18;
  // @Input() heightIconHeader: number = 26;
  @Input() textHeader: string = 'Đóng gói';
  @Input() sizeIcon: number = 26;
  @Input() classIconFontAwesome: string = 'fa-triangle-exclamation';
  @Input() heightHeader: number = 50;
  @Input() gap: number = 10;



}
