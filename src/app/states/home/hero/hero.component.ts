import { Component, AfterViewChecked } from '@angular/core';

@Component({
	selector: 'hero-component',
	templateUrl: './hero.component.html',
	styleUrls: ['hero.component.scss'],
})
export class HeroComponent implements AfterViewChecked {

	public animateClass: string;

	constructor() { }

	ngAfterViewChecked() {
		console.log('now');
	}
}
