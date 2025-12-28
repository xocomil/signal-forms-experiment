import { Component } from '@angular/core';
import { Todo } from '../components/todo';

@Component({
  imports: [Todo],
  selector: 'app-root',
  template: `<app-todo />`,
  styles: '',
})
export class App {}
