import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Control, FieldTree } from '@angular/forms/signals';
import { ZodErrorPipe } from '../pipes/zod-error-pipe';

@Component({
  selector: 'app-input',
  imports: [ZodErrorPipe, FormsModule, Control],
  template: `
    @let control = this.control();

    <fieldset class="fieldset">
      <legend class="fieldset-legend">{{ label() }}</legend>
      <input
        class="input w-full"
        [control]="control"
        [class.input-error]="control().invalid()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        type="text"
      />
      @for (error of control().errors(); track error) {
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
export class Input {
  control = input.required<FieldTree<string>>();

  label = model<string>('Input Value');
  placeholder = model<string>('Enter a value');
  disabled = model(false);
}
