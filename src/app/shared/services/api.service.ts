import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Movie } from '_shared';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

// Const Variables
const API_URL = 'http://localhost:3004';

@Injectable()
export class ApiService {

	public movies: Observable<Movie[]>;
	public storedMovies: Movie[];
	public showSpinner = false;

	// Constructor / dependencies
	constructor(private http: Http) {
		this.movies = this.getAllMovies();
	}

	// HandleError Method
	private handleError(error: Response | any) {
		console.error('ApiService::handleError', error);
		this.toggleLoadingSpinner();
		return Observable.throw(error);
	}

	public toggleLoadingSpinner() {
		this.showSpinner = !this.showSpinner;
	}

	public getAllMovies(): Observable<Movie[]> {
		this.toggleLoadingSpinner();
		return new Observable(observer => {
			if (this.storedMovies) {
				observer.next(this.storedMovies);
				this.toggleLoadingSpinner();
				return observer.complete();
			}
			this.http
				.get(API_URL + '/movies')
				.map((response: Response) => (response.json() as Array<Movie>))
				.catch(this.handleError)
				.subscribe((movies: Array<Movie>) => {
					this.storedMovies = movies;
					observer.next(this.storedMovies);
					this.toggleLoadingSpinner();
					return observer.complete();
				});
		});
	}

	public addMovie(movie: Movie): Observable<Movie> {
		this.toggleLoadingSpinner();
		return this.http
			.post(API_URL + '/movies', movie)
			.map(response => {
				this.toggleLoadingSpinner();
				return response.json();
			})
			.catch(this.handleError);
	}

	public getMovieById(movieId: number): Observable<Movie> {
		this.toggleLoadingSpinner();
		return this.http
			.get(API_URL + '/movies/' + movieId)
			.map(response => {
				const movie = response.json();
				this.toggleLoadingSpinner();
				return movie;
			})
			.catch(this.handleError);
	}

	public updateMovie(movie: Movie): Observable<Movie> {
		this.toggleLoadingSpinner();
		return this.http
			.put(API_URL + '/movies/' + movie.id, movie)
			.map(response => {
				this.toggleLoadingSpinner();
				return response.json();
			})
			.catch(this.handleError);
	}

	public deleteMovieById(movieId: number): Observable<null> {
		return this.http
			.delete(API_URL + '/movies/' + movieId)
			.catch(this.handleError);
	}

	public getMovieByIMDBId(imdbID: any): Observable<Movie> {
		this.toggleLoadingSpinner();
		return this.http
			.get(API_URL + '/movies')
			.map(response => {
				const movies = response.json();
				const movie = movies.find(data => data.imdbID === imdbID);
				this.toggleLoadingSpinner();
				return movie;
			})
			.catch(this.handleError);
	}
}
