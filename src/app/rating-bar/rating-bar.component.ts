import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
interface IRatingUnit {
  value: number;
  active: boolean;
}
@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.css']
})
export class RatingBarComponent implements OnInit {
  @Input()
  max = 5;
  @Input()
  ratinhValue = 5;
  @Input()
  showRatinhValue = true;

  @Output()
  rateChage = new EventEmitter<number>();

  ratingUnits: Array<IRatingUnit> = [];
  constructor() { }

  ngOnInit() {
    this.calculate(this.max, this.ratinhValue);
  }
  ngOnchange(changes: SimpleChanges) {
    if ('max' in changes) {
      let max = changes.max.currentValue;
      max = typeof max === 'undefined' ? 5 : max;
      this.max = max;
      this.calculate(max, this.ratinhValue);
    }
  }
  calculate(max, ratingValue) {
    this.ratingUnits = Array.from({length: max},
      (_, index) => ({
        value: index + 1,
        active: index < ratingValue
      }));
  }
  select(index) {
    this.ratinhValue = index + 1;
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratinhValue);
    this.rateChage.emit(this.ratinhValue);
  }

  enter(index) {
    this.ratingUnits.forEach((item, idx) => item.active = idx <= index);
  }

  reset() {
    this.ratingUnits.forEach((item, idx) => item.active = idx < this.ratinhValue);
  }

}
