import { Component } from '@angular/core';

@Component({
	selector: 'find-movie-component',
	templateUrl: './find-movie.component.html',
	styleUrls: ['find-movie.component.scss'],
})
export class FindMovieComponent {

	public searchFilter: string;

	constructor() {}

	receiveSearchFilter($event) {
		this.searchFilter = $event;
	}
}
