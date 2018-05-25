import { Component } from '@angular/core';

@Component({
	selector: 'find-movie-component',
	templateUrl: './find-movie.component.html',
	styleUrls: ['find-movie.component.scss'],
})
export class FindMovieComponent {

	public searchFilter: string;

	constructor() {}

	// Receives the search filter event from filter component
	// which then updates the find movie content component data
	receiveSearchFilter($event) {
		this.searchFilter = $event;
	}
}
