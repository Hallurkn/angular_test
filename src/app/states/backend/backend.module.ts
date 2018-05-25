import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// containers
import { BackendComponent } from './backend.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

// services
import { OMDBService, ApiService } from '_shared/services/';

// routes
export const ROUTES: Routes = [
	{
		path: '',
		component: BackendComponent,
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(ROUTES)
	],
	providers: [
		OMDBService,
		ApiService
	],
	declarations: [
		BackendComponent,
		MovieFormComponent
	]
})
export class BackendModule { }
