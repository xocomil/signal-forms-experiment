import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  imports: [],
  template: `<p>todo-form works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoForm {}
