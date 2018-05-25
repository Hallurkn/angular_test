import { ApiService } from '_shared/services/';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
	selector: 'movie-details-content-component',
	templateUrl: './movie-details-content.component.html',
	styleUrls: ['movie-details-content.component.scss'],
})
export class MovieDetailsContentComponent {

	private movie: any;

	constructor(private route: ActivatedRoute, private data: ApiService) {
		route.params.subscribe(params => {
			const id = params['id'];
			this.data.getMovieById(id)
				.subscribe(movie => {
					this.movie = movie;
					console.log(this.movie);
				}
				);
		});
	}
}
