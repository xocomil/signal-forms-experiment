import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
} from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { ZodErrorPipe } from '../pipes/zod-error-pipe';

@Component({
  selector: 'app-projected-input',
  imports: [ZodErrorPipe],
  template: `
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{{ label() }}</legend>
      <ng-content />
      @for (error of errors(); track error) {
        <p class="label text-error">{{ error | zodError }}</p>
      }
    </fieldset>
  `,
  host: {
    class: 'block',
  },
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectedInput {
  label = input<string>('Input Value');
  errors = input<ValidationError[]>([]);
}

@Directive({
  selector: 'input[appDefaultStyle]',
  host: {
    class: 'input w-full',
  },
})
export class ProjectedInputStyles {}
