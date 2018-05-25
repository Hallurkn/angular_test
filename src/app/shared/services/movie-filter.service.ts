import { Observable } from 'rxjs/Observable';
import { ApiService } from '_shared/services/api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class MovieFilterService {

	private filteredMoviesSource = new BehaviorSubject([]);
	public filteredMovies = this.filteredMoviesSource.asObservable();
	public staticMovies: Observable<any>;

	constructor(private data: ApiService) {
		this.data.movies.subscribe(movieData => {
			this.filteredMoviesSource.next(movieData);
			this.staticMovies = Observable.of(movieData);
		});
	}

	updateFilteredMovies(movies: any) {
		this.filteredMoviesSource.next(movies);
	}
}
