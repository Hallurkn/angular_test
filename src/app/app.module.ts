import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SlickModule } from 'ngx-slick';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing-module';

import {
	NotFoundComponent,
	AboutComponent,
	AboutContentComponent,
	HomeComponent,
	HomeContentComponent,
	HeroComponent,
	NewsletterComponent,
	SellingPointsComponent
} from '_states';

import {
	WINDOW_PROVIDERS,
	ApiService,
	HeaderComponent,
	FooterComponent,
	SlickSliderComponent,
} from '_shared';

@NgModule({
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		HttpModule,
		HttpClientModule,
		CommonModule,
		FormsModule,
		LazyLoadImagesModule,
		BsDropdownModule.forRoot(),
		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		SlickModule.forRoot(),
		AppRoutingModule
	],
	providers: [
		WINDOW_PROVIDERS,
		ApiService
	],
	declarations: [
		AppComponent,
		HomeComponent,
		HomeContentComponent,
		HeroComponent,
		NewsletterComponent,
		SellingPointsComponent,
		SlickSliderComponent,
		AboutComponent,
		AboutContentComponent,
		NotFoundComponent,
		HeaderComponent,
		FooterComponent,
	],
})
export class AppModule {
	constructor(public appRef: ApplicationRef) { }
	hmrOnInit(store) {
		if ('restoreInputValues' in store) {
			store.restoreInputValues();
		}
		this.appRef.tick();
		Object.keys(store).forEach(prop => delete store[prop]);
	}
	hmrOnDestroy(store) {
		const cmpLocation = this.appRef.components.map(
			cmp => cmp.location.nativeElement,
		);
		store.disposeOldHosts = createNewHosts(cmpLocation);
		store.restoreInputValues = createInputTransfer();
		removeNgStyles();
	}
	hmrAfterDestroy(store) {
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}
}
