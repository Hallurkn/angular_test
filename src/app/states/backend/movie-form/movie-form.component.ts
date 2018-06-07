import { Component } from '@angular/core';
import { ApiService, OMDBService } from '_shared/services/';
import { Movie } from '_shared';

@Component({
	selector: 'movie-form-component',
	templateUrl: './movie-form.component.html',
	styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent {

	public id: string;
	public statusMessage: string;
	public statusClass: string;

	constructor(private omdbService: OMDBService, private api: ApiService) { }

	addMovie(movieId: string) {
		this.omdbService.getMovieData(movieId)
			.subscribe(imdbMovie => {
				if (imdbMovie.Response === 'True') {
					this.api.getMovieByIMDBId(imdbMovie.imdbID).subscribe(movie => {
						// Check if movie with same id is present in the db, if not add to db
						if (!movie) {
							this.api.addMovie(imdbMovie).subscribe();
							this.statusMessage = 'Movie successfully added to the database.';
							this.statusClass = 'alert-success';
							this.id = '';
						} else {
							this.statusMessage = 'The Movie you added is already part of your database.';
							this.statusClass = 'alert-warning';
						}
					});
				} else {
					this.statusMessage = 'No movie with this id was found in IMDB\'s registry';
					this.statusClass = 'alert-danger';
				}
			});
	}

	deleteMovie(imdbID: string) {
		this.api.getMovieByIMDBId(imdbID).subscribe(movie => {
			// Check if movie with same id is present in the db, if not add to db
			if (movie.Response === 'True') {
				this.api.deleteMovieById(movie.id).subscribe();
				this.statusMessage = 'Movie successfully removed from the database.';
				this.statusClass = 'alert-success';
				this.id = '';
			} else {
				this.statusMessage = 'No movie with this id was found in your database.';
				this.statusClass = 'alert-danger';
			}
		});
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

