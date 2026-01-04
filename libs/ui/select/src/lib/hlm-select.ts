import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/utils';

@Directive({
	selector: 'hlm-select, brn-select [hlm]',
})
export class HlmSelect {
	constructor() {
		classes(() => 'space-y-2');
	}
}
