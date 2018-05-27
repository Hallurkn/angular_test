import { ApiService } from '_shared/services/api.service';
import { MovieFilterService } from '_shared/services/';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '_shared';

@Component({
	selector: 'find-movie-content-component',
	templateUrl: './find-movie-content.component.html',
	styleUrls: ['find-movie-content.component.scss'],
})

export class FindMovieContentComponent implements OnInit {

	@Input() searchFilter: string;
	public filteredMovies: Movie[];

	constructor(private filterService: MovieFilterService, private api: ApiService) { }

	ngOnInit(): void {
		this.filterService.filteredMovies.subscribe(movieData => {
			this.filteredMovies = movieData;
		});
	}
}
