import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import {
	HeroComponent,
	HomeComponent,
	HomeContentComponent,
	AboutComponent,
	AboutContentComponent,
	NewsletterComponent,
	NotFoundComponent,
} from '_states';

export const ROUTES = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				component: HomeContentComponent,
			}
		],
	},
	{
		path: 'movies',
		loadChildren: './states/find-movie/find-movie.module#FindMovieModule'
	},
	{
		path: 'backend',
		loadChildren: './states/backend/backend.module#BackendModule'
	},
	{
		path: 'details/:id',
		loadChildren: './states/movie-details/movie-details.module#MovieDetailsModule'
	},
	{
		path: 'about',
		component: AboutComponent,
		children: [
			{
				path: '',
				component: AboutContentComponent,
			}
		],
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
	],
	providers: [HomeComponent],
	exports: [RouterModule],
	entryComponents: [
		NewsletterComponent,
		HeroComponent,
		HomeComponent,
		HomeContentComponent,
		AboutComponent,
		AboutContentComponent,
		NotFoundComponent,
	],
})
export class AppRoutingModule { }
