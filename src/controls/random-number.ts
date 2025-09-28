import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-random-number',
  imports: [],
  template: `<p>random-number works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomNumber {}
