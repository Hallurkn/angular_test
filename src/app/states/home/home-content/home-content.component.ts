import { Movie } from '_shared';
import { ApiService } from './../../../shared/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'home-content-component',
	templateUrl: './home-content.component.html',
	styleUrls: ['home-content.component.scss'],
})
export class HomeContentComponent implements OnInit {

	public slideConfigMain: any;
	public slideConfigSecondary: any;
	public movies: Movie[];

	public slickEntries = [
		'tt1155592', 'tt1013753', 'tt0059579', 'tt0060196', 'tt0064116', 'tt0114608', 'tt0119345', 'tt0134084'
	];
	public slickMovies = [];

	constructor(private data: ApiService) {
		this.slideConfigMain = {
			slidesToShow: 4,
			slidesToScroll: 4,
			arrows: true,
			infinite: true,
			adaptiveHeight: false,
			responsive: [
				{
					breakpoint: 748,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 580,
					settings: {
						arrows: false,
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
			]};

		this.slideConfigSecondary = {
			slidesToShow: 6,
			slidesToScroll: 6,
			arrows: true,
			infinite: true,
			adaptiveHeight: false,
			responsive: [
				{
					breakpoint: 748,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},
				{
					breakpoint: 580,
					settings: {
						arrows: false,
						slidesToShow: 4,
						slidesToScroll: 4,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				},
			]};
	}

	ngOnInit(): void {
		this.data.movies.subscribe(movieData => {
			this.movies = movieData;
			this.filterMovies(this.slickEntries, this.slickMovies);
		});
	}

	filterMovies(imdbIDs, slickMovies) {
		for (let i = 0; i < imdbIDs.length; i++) {
			for (let j = 0; j < this.movies.length; j++) {
				if (imdbIDs[i] === this.movies[j].imdbID) {
					slickMovies.push(this.movies[j]);
					continue;
				}
			}
		}
	}
}
