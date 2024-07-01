import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StatusColorPipe } from 'src/app/admin-pages/shared/pipe/StatusColorPipe';

/**
 * 
 */
@Component({
  selector: 'component-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.scss']
})
export class PopupConfirmComponent implements OnInit{

  @Input() widthPopUp: number = 370;
  @Input() heightPopUp: number = 238;
  @Input() color: string = "#09880E";
  @Input() fontWeightHeader: number = 600;
  @Input() fontSizeHeader: number = 18;
  // @Input() heightIconHeader: number = 26;
  @Input() textHeader: string = 'Thông báo';
  @Input() sizeIcon: number = 26;
  @Input() classIconFontAwesome: string = 'fa-share';
  @Input() heightHeader: number = 50;
  @Input() gap: number = 10;
  @Input() text: string = 'Đóng gói';
  @Input() bgColor: string = '#09880E';

  constructor(private statusColorPipe: StatusColorPipe) {}

  ngOnInit(): void {
    this.bgColor = this.statusColorPipe.transform(this.text);
    this.color = this.statusColorPipe.transform(this.text);
  }  

}
