import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'component-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  animations: [
    trigger('countUp', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class StatisticsComponent implements OnInit {
  @Input() textField: string = 'Nhập tiêu đề...';
  @Input() valueField: number = 100;
  
  currentCount: number = 0;
  
  ngOnInit(): void {
    this.countUp();
  }

  countUp() {
    let start = 0;
    const end = this.valueField;
    const duration = 500;
    const increment = end / (duration / 10);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        this.currentCount = end;
        clearInterval(interval);
      } else {
        this.currentCount = Math.round(start);
      }
    }, 10);
  }
}
