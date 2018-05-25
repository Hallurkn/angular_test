import 'zone.js/dist/zone';
import 'reflect-metadata';

import 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader, hmrModule } from '@angularclass/hmr';

import { AppModule } from './app/app.module';

const isProduction = process.env.NODE_ENV === 'production';

export function main() {
	if (isProduction) {
		enableProdMode();
	}

	return platformBrowserDynamic().bootstrapModule(AppModule)
		.then((ngModuleRef: any) => {
			if (!isProduction) {
				// `module` global ref for webpackhmr
				return hmrModule(ngModuleRef, module);
			} else {
				return ngModuleRef;
			}
		});

}

bootloader(main);
