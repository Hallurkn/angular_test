import { Component, Input } from '@angular/core';

@Component({
	selector: 'slick-slider-component',
	templateUrl: './slick-slider.component.html',
	styleUrls: ['slick-slider.component.scss'],
})
export class SlickSliderComponent {
	@Input() message: string;
	@Input() movies: any;
	@Input() slideConfig: any;

	constructor() {}
}
