import { MovieFilterService } from '_shared/services/';
import { Component, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
	selector: 'find-movie-filters-component',
	templateUrl: './find-movie-filters.component.html',
	styleUrls: ['find-movie-filters.component.scss'],
})
export class FindMoviesFiltersComponent {

	public fullMovieList: any;
	public filteredMovies: any;

	public sortLetterAsc = true;
	public sortYearAsc = true;

	public genresOption: any;
	public countriesOption: any;

	public curCountryFilter: string;
	public curGenreFilter: string;

	@Output() filterEvent = new EventEmitter<string>();

	constructor(private data: MovieFilterService) {
		this.data.filteredMovies.subscribe(movieData => {
			this.filteredMovies = movieData;
			this.fullMovieList = movieData;
			this.getCountriesOption();
			this.getGenresOption();
		});
	}

	updateSearchFilter(searchValue: string) {
		this.filterEvent.emit(searchValue);
	}

	// Function that talks to service and updates global data
	updateFilteredMovies(movies) {
		this.data.updateFilteredMovies(movies);
	}

	getGenresOption() {
		this.genresOption = _.uniqBy(this.filteredMovies, function (e: any) {
			return e.Genre;
		});
	}

	getCountriesOption() {
		this.countriesOption = _.uniqBy(this.filteredMovies, function (e: any) {
			return e.Country;
		});
	}

	// assignCopy(movies) {
	// 	this.filteredMovies = Object.assign([], this.items);
	// }

	filterMovies() {
		// this.assignCopy(this.filteredMovies);
		if (this.curCountryFilter) {
			this.filteredMovies = Object.assign([], this.fullMovieList).filter(
				movie => movie.Country.toLowerCase().indexOf(this.curCountryFilter.toLowerCase()) > -1
			);
		}
		if (this.curGenreFilter) {
			this.filteredMovies = Object.assign([], this.fullMovieList).filter(
				movie => movie.Genre.toLowerCase().indexOf(this.curGenreFilter.toLowerCase()) > -1
			);
		}
		this.updateFilteredMovies(this.filteredMovies);
	}

	filterByCountry(value) {
		this.curCountryFilter = value;
		this.filterMovies();

	}

	filterByGenre(value) {
		this.curGenreFilter = value;
		this.filterMovies();
	}

	sortByLetter() {
		this.sortYearAsc = true;
		if (this.sortLetterAsc) {
			this.sortLetterAsc = !this.sortLetterAsc;
			this.filteredMovies.sort((a: any, b: any) => {
				return (a.Title < b.Title ? -1 : (a.Title > b.Title ? 1 : 0));
			});
		} else {
			this.sortLetterAsc = !this.sortLetterAsc;
			this.filteredMovies.sort((a: any, b: any) => {
				return (a.Title < b.Title ? 1 : (a.Title > b.Title ? -1 : 0));
			});
		}
		this.updateFilteredMovies(this.filteredMovies);
	}

	sortByYear() {
		this.sortLetterAsc = true;
		if (this.sortYearAsc) {
			this.sortYearAsc = !this.sortYearAsc;
			this.filteredMovies.sort((a: any, b: any) => {
				return b.Year - a.Year;
			});
		} else {
			this.sortYearAsc = !this.sortYearAsc;
			this.filteredMovies.sort((a: any, b: any) => {
				return a.Year - b.Year;
			});
		}
		this.updateFilteredMovies(this.filteredMovies);
	}
}
