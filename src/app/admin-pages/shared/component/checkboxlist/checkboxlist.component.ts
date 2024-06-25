import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { listColor } from '../../dto/DTOColor.dto.';

@Component({
  selector: 'component-checkboxlist',
  templateUrl: './checkboxlist.component.html',
  styleUrls: ['./checkboxlist.component.scss']
})
export class CheckboxlistComponent implements OnInit {
  @Input() listCheckBox: any;
  @Input() textField: string;
  @Input() valueField: any;
  @Output() listChecked: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  onClickItemCheckBox(item: any){
    if(item.IsChecked || !item.IsChecked){
      item.IsChecked = !item.IsChecked;
    }
  }
}
