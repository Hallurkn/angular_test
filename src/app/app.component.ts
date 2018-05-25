import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, Router } from '@angular/router';

@Component({
	selector: 'main-app',
	templateUrl: './app.component.html',
	encapsulation: ViewEncapsulation.None, // tslint:disable-line:use-view-encapsulation
	styleUrls: ['./style/app.scss'],
})

export class AppComponent implements AfterViewInit {
	loading;
	constructor(
		private router: Router
	) {
		this.loading = true;
	}
	ngAfterViewInit() {
		this.router.events
			.subscribe((event) => {
				if (event instanceof NavigationStart) {
					this.loading = true;
				} else if (
					event instanceof NavigationEnd ||
					event instanceof NavigationCancel
				) {
					this.loading = false;
				}
			});
	}
}
