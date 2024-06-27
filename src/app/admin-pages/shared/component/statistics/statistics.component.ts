import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

/**
 * Component thống kê. Trong đó:
 * - Input textField là tiêu đề.
 * - Input valueField là số liệu cần hiển thị.
 * - Input color là màu chủ đạo (là màu mã HEX).
 */
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
  @Input() color: string = '#2557A0';
  boxShadow: string = `${this.hexToRgba(this.color, 0.3)} 0px 5px 10px`;

  currentCount: number = 0;

  ngOnInit(): void {
    this.countUp();
  }

  countUp() {
    let start = 0;
    const end = this.valueField;
    const duration = 1000;
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

  hexToRgba(hex: string, alpha: number = 1): string {
    let r = 0, g = 0, b = 0;

    // Handle 3-digit hex
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);

    // Handle 6-digit hex
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
