import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-date-picker',
  imports: [Field],
  template: `
    @let field = this.field();

    <div class="form-control">
      <label class="label" [attr.for]="field().name()">
        <span class="label-text">{{ label() }}</span>
        @if (field().value()) {
          <button
            class="btn btn-xs btn-ghost hover:bg-error/10"
            [disabled]="field().disabled()"
            (click)="clearDate()"
            type="button"
            aria-label="Clear date"
          >
            ❌
          </button>
        }
      </label>
      <input
        class="input input-bordered w-full"
        [class.input-error]="field().invalid()"
        [field]="field"
        [placeholder]="placeholder()"
        type="date"
      />
    </div>
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {
  readonly field = input.required<FieldTree<Date | undefined>>();

  label = input('Due Date');
  placeholder = input('Select a date');

  // protected dateString = computed(() => {
  //   const date = this.field().value();
  //   if (!date) return '';

  //   // Convert Date to YYYY-MM-DD format for input[type="date"]
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // });

  protected handleInput(event: Event) {
    //   const input = event.target as HTMLInputElement;
    //   const dateString = input.value;
    //   if (!dateString) {
    //     this.field().value.set(undefined);
    //     return;
    //   }
    //   // Parse YYYY-MM-DD format from input[type="date"]
    //   const date = new Date(dateString + 'T00:00:00');
    //   this.field().value.set(date);
  }

  protected clearDate() {
    //   this.field().value.set(undefined);
  }
}
