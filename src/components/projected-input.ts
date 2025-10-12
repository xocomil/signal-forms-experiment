import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-projected-input',
  imports: [],
  template: `<p>projected-input works!</p>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectedInput {}
