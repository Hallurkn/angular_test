import { MovieFilterService } from '_shared/services/';
import { Component, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
	selector: 'find-movie-filters-component',
	templateUrl: './find-movie-filters.component.html',
	styleUrls: ['find-movie-filters.component.scss'],
})
export class FindMoviesFiltersComponent {

	public staticMovies: any;
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
		});
		// Get static movies in order to make sure the select property
		// remains static and to have an object to reset to
		this.data.staticMovies.subscribe(movieData => {
			this.staticMovies = movieData;
			this.getCountriesOption();
			this.getGenresOption();
		});

		// Reset filter in case someone leaves page and comes back
		this.filterMovies();
	}

	// Emit the search filter to parent
	updateSearchFilter(searchValue: string) {
		this.filterEvent.emit(searchValue);
	}

	// Function that talks to service and updates global data
	updateFilteredMovies(movies) {
		this.data.updateFilteredMovies(movies);
	}

	// Generates the genres to list in select option
	getGenresOption() {
		this.genresOption = _.uniqBy(this.filteredMovies, function (e: any) {
			return e.Genre;
		});
	}

	// Generates the countries to list in select option
	getCountriesOption() {
		this.countriesOption = _.uniqBy(this.filteredMovies, function (e: any) {
			return e.Country;
		});
	}

	// Filters movies by both parameters
	filterMovies() {
		// Resets filteredMovies to all staticMovies
		this.filteredMovies = this.staticMovies;
		if (this.curCountryFilter) {
			this.filteredMovies = this.filteredMovies.filter(
				movie => movie.Country.toLowerCase().indexOf(this.curCountryFilter.toLowerCase()) > -1
			);
		}
		if (this.curGenreFilter) {
			this.filteredMovies = this.filteredMovies.filter(
				movie => movie.Genre.toLowerCase().indexOf(this.curGenreFilter.toLowerCase()) > -1
			);
		}
		this.updateFilteredMovies(this.filteredMovies);
	}

	// Filters by country, gets new value and calls filter movies
	filterByCountry(value) {
		this.curCountryFilter = value;
		this.filterMovies();
	}

	// Filters by genre, gets new value and calls filter movies
	filterByGenre(value) {
		this.curGenreFilter = value;
		this.filterMovies();
	}

	// Sorts all filtered movies by letter
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

	// Sorts all filtered movies by year
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
