import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FindMoviesFiltersComponent } from './find-movie-filters/find-movie-filters.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import { FindMovieComponent } from './find-movie.component';
import { FindMovieContentComponent } from './find-movie-content/find-movie-content.component';
import { LoaderComponent } from '_shared/components/loader/loader.component';

// services
import { ApiService, MovieFilterService } from '_shared/services/';

// routes
export const ROUTES: Routes = [
	{
		path: '',
		component: FindMovieComponent,
		children: [
			{
				path: '',
				component: FindMovieContentComponent,
			}
		],
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		Ng2SearchPipeModule,
		LazyLoadImagesModule,
		RouterModule.forChild(ROUTES)
	],
	providers: [
		ApiService,
		MovieFilterService
	],
	declarations: [
		FindMovieComponent,
		FindMovieContentComponent,
		FindMoviesFiltersComponent,
		LoaderComponent
	]
})
export class FindMovieModule { }
