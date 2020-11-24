import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      return (
        ("00" + hours).slice(-2) +
        ":" +
        ("00" + (minutes % 60)).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    } else {
      return (
        ("00" + minutes).slice(-2) +
        ":" +
        ("00" + Math.floor(value - minutes * 60)).slice(-2)
      );
    }
  }
}
