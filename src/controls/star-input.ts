import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'app-star-input',
  imports: [],
  template: `
    <div class="rating">
      @for (i of range(); track i) {
        <input
          class="mask mask-star-2"
          [class]="colorClass()"
          [checked]="value() === i"
          (change)="updateValue(i)"
          name="star-input-{{ name() }}"
          aria-label="{{ i }}-star rating"
          type="radio"
        />
      }
    </div>
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarInput implements FormValueControl<number> {
  value = model<number>(0);
  min = input<number>(1);
  max = input<number>(2);
  name = input<string>('');

  protected *range() {
    const min = this.min() <= 0 ? 1 : this.min();

    for (let i = min; i <= this.max(); i++) {
      yield i;
    }
  }

  protected colorClass = computed(() => {
    if (this.value() === 0) {
      return 'bg-grey-200';
    }

    if (this.value() < 2) {
      return 'bg-error';
    }
    if (this.value() < 4) {
      return 'bg-warning';
    }

    return 'bg-success';
  });

  protected updateValue(value: number) {
    this.value.set(value);
  }
}
