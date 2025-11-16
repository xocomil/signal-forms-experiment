import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Field, FieldTree } from '@angular/forms/signals';
import { ZodErrorPipe } from '../pipes/zod-error-pipe';

@Component({
  selector: 'app-input',
  imports: [Field, ZodErrorPipe],
  template: `
    @let field = this.fieldTree();

    <fieldset class="fieldset">
      <legend class="fieldset-legend">{{ label() }}</legend>
      <input
        class="input w-full"
        [field]="field"
        [class.input-error]="field().invalid()"
        [placeholder]="placeholder()"
        type="text"
      />
      @for (error of field().errors(); track error) {
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
  fieldTree = input.required<FieldTree<string>>();

  label = model<string>('Input Value');
  placeholder = model<string>('Enter a value');
}
