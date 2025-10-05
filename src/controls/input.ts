import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { ZodErrorPipe } from '../pipes/zod-error-pipe';

@Component({
  selector: 'app-input',
  imports: [ZodErrorPipe, FormsModule],
  template: `
    <fieldset class="fieldset">
      <legend class="fieldset-legend">{{ label() }}</legend>
      <input
        class="input w-full"
        [(ngModel)]="value"
        [class.input-error]="invalid()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        type="text"
      />
      @for (error of errors(); track error) {
        <p class="label text-error">{{ error | zodError }}</p>
      }
    </fieldset>
  `,
  styles: ``,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input implements FormValueControl<string> {
  // TODO: look into PRs for signal forms for how they are
  // passing controls into custom controls
  value = model<string>();
  invalid = model<boolean>();
  errors = model<ValidationError[]>();
  label = model<string>('Input Value');
  placeholder = model<string>('Enter a value');
  disabled = model<boolean>(false);
}
