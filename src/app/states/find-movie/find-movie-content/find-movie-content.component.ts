import { MovieFilterService } from '_shared/services/';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'find-movie-content-component',
	templateUrl: './find-movie-content.component.html',
	styleUrls: ['find-movie-content.component.scss'],
})

export class FindMovieContentComponent implements OnInit {

	@Input() searchFilter: string;
	public filteredMovies: any;

	constructor(private filterService: MovieFilterService) { }

	ngOnInit(): void {
		this.filterService.filteredMovies.subscribe(movieData => {
			this.filteredMovies = movieData;
		});
	}
}
