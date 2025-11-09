import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-random-number',
  imports: [],
  template: `
    <button
      class="btn btn-primary"
      [disabled]="disabled()"
      (click)="handleClick()"
      type="button"
    >
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
  minValue = input.required<number>();
  maxValue = input.required<number>();
  disabled = input(false);

  protected handleClick() {
    this.value.set(
      Math.floor(Math.random() * (this.maxValue() - this.minValue() + 1)) +
        this.minValue(),
    );
  }
}
