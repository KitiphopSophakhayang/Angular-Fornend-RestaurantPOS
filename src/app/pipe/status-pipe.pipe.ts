import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe',
})
export class StatusPipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    // console.log('Pip value: ' + value);
    if (value === 'pending') {
      return 'กำลังเตรียมออเดอร์';
    } else {
      return 'เตรียมออเดอร์สำเร็จแล้ว';
    }
  }
}
