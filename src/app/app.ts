import { Component } from '@angular/core';
import { Todo } from '../components/todo';

@Component({
  imports: [Todo],
  selector: 'app-root',
  template: `<p>Hey everything still works</p>
    <app-todo />`,
  styles: '',
})
export class App {}
