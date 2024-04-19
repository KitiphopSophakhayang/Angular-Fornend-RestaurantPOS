import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter(function (order: any) {
      return JSON.stringify(order).toLowerCase().includes(args);
    });
  }
}

@Pipe({
  name: 'filterByFoodType'
})
export class FilterByFoodTypePipe implements PipeTransform {
  transform(items: any[], selectedFoodType: any): any[] {
    if (!items || !selectedFoodType) {
      return items;
    }
    return items.filter(item => item.foodType === selectedFoodType);
  }
}
