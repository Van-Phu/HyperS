import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})

/**
 * StatusColorPipe using for change style color base on text status
 * Using example: 
 * In file ts: Create variable status: string = 'Đang soạn thảo' or something else
 * In file html: <div [style.color]="status | statusColor">{{ status }}</div>
 */
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case '':
        return '#23282c';
      case 'Chờ xác nhận':
        return '#23282c';
      case 'Đang đóng gói':
        return '#09880E';
      case 'Đang vận chuyển':
        return '#2480BD';
      case 'Giao hàng thất bại':
        return '#FF1D1D';
      case 'Giao hàng thành công':
        return '#F1802E'
      case 'Hoạt động':
        return '#09880E'
      case 'Đang kinh doanh':
        return '#09880E'
      case 'Vô hiệu hóa':
        return '#FF1D1D'
      case 'Ngừng kinh doanh':
        return '#FF1D1D'
      default:
        return 'black';
    }
  }
}