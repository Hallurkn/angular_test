import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'loader-component',
	templateUrl: './loader.component.html',
	styleUrls: ['loader.component.scss'],
})
export class LoaderComponent implements OnInit {
	@Input() showSpinner: boolean;

	constructor() { }

	ngOnInit() {
	}
}
