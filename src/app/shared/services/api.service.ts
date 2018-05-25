import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

// Const Variables
const API_URL = 'http://localhost:3004';

@Injectable()
export class ApiService {

	public movies: any;

	// Constructor / dependencies
	constructor(private http: Http) {
		this.movies = this.getAllMovies();
	}

	// HandleError Method
	private handleError(error: Response | any) {
		console.error('ApiService::handleError', error);
		return Observable.throw(error);
	}

	public getAllMovies(): Observable<any[]> {
		const localData = JSON.parse(localStorage.getItem('movies'));
		if (localData) {
			return Observable.of(localData);
		} else {
			return this.http
			.get(API_URL + '/movies')
			.map(response => {
				const movies = response.json();
				localStorage.setItem('movies', JSON.stringify(movies));
				return movies;
			})
			.catch(this.handleError);
		}
	}

	// API: POST /todos
	public addMovie(movie: any[]): Observable<any> {
		return this.http
			.post(API_URL + '/movies', movie)
			.map(response => {
				return response.json();
			})
			.catch(this.handleError);
	}

	// API: GET /todos/:id
	public getMovieById(movieId: number): Observable<any> {
		return this.http
			.get(API_URL + '/movies/' + movieId)
			.map(response => {
				const movie = response.json();
				return movie;
			})
			.catch(this.handleError);
	}

	// DELETE /todos/:id
	public deleteMovieById(movieId: number): Observable<null> {
		return this.http
			.delete(API_URL + '/movies/' + movieId)
			// .map(response => null)
			.catch(this.handleError);
	}

	public getMovieByIMDBId(imdbID: any): Observable<any> {
		return this.http
			.get(API_URL + '/movies')
			.map(response => {
				const movies = response.json();
				const movie = movies.find(data => data.imdbID === imdbID);
				return movie;
			});
	}
}
