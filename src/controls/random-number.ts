import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-random-number',
  imports: [],
  template: `
    <button class="btn btn-primary" (click)="handleClick()" type="button">
      {{ value() }}
    </button>
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomNumber implements FormValueControl<number> {
  value = model<number>();
  minValue = model.required<number>();
  maxValue = model.required<number>();

  protected handleClick() {
    this.value.set(
      Math.floor(Math.random() * (this.maxValue() - this.minValue() + 1)) +
        this.minValue(),
    );
  }
}
