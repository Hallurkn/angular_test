import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import { MovieDetailsComponent } from './movie-details.component';
import { MovieDetailsContentComponent } from './movie-details-content/movie-details-content.component';

// services
import { ApiService } from '_shared/services/';
import { VimeoEmbedComponent } from '_shared/components';

// routes
export const ROUTES: Routes = [
	{
		path: '',
		component: MovieDetailsComponent,
		children: [
			{
				path: '',
				component: MovieDetailsContentComponent,
			}
		],
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(ROUTES)
	],
	providers: [
		ApiService
	],
	declarations: [
		MovieDetailsComponent,
		MovieDetailsContentComponent,
		VimeoEmbedComponent
	]
})
export class MovieDetailsModule { }
