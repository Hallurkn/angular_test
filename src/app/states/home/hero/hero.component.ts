import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'hero-component',
	templateUrl: './hero.component.html',
	styleUrls: ['hero.component.scss'],
})
export class HeroComponent implements OnInit {

	public animateClass: string;

	constructor() { }

	ngOnInit(): void {

	}
}
