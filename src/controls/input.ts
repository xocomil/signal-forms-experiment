import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  template: `<p>input works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {}
