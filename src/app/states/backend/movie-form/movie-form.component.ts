import { Component } from '@angular/core';
import { ApiService, OMDBService } from '_shared/services/';

@Component({
	selector: 'movie-form-component',
	templateUrl: './movie-form.component.html',
	styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent {

	public movie: any;
	public id: string;
	public statusMessage: string;

	constructor(private omdbService: OMDBService, private api: ApiService) { }

	addMovie(movieId: string) {
		this.omdbService.getMovieData(movieId)
			.subscribe(movieData => {
				this.movie = movieData;
				if (this.movie) {
					this.api.getMovieByIMDBId(this.movie.imdbID).subscribe(data => {
						// Check if movie with same id is present in the db, if not add to db
						if (!data) {
							this.api.addMovie(this.movie).subscribe();
							this.statusMessage = 'Movie successfully added to the database.';
						} else {
							this.statusMessage = 'The Movie you added is already part of your database.';
						}
					});
				} else {
					this.statusMessage = 'No movie with this id was found in IMDB\'s registry';
				}
			});
	}

	deleteMovie(movieId: string) {
		if (this.movie) {
			this.api.getMovieByIMDBId(this.movie.imdbID).subscribe(data => {
				// Check if movie with same id is present in the db, if not add to db
				if (data) {
					this.api.deleteMovieById(data.id).subscribe();
					this.statusMessage = 'Movie successfully removed from the database.';
				} else {
					this.statusMessage = 'No movie with this id was found in your database.';
				}
			});
		}
	}

	onSubmit(form): void {
		if (form.valid) {
			this.addMovie(this.id);
		}
	}

	onDelete(form): void {
		if (form.valid) {
			this.deleteMovie(this.id);
		}
	}

	onCancel(form): void {
		if (form.valid) {
			form.reset();
		}
	}
}

