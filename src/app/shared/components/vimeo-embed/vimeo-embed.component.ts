import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'vimeo-embed-component',
	templateUrl: './vimeo-embed.component.html',
	styleUrls: ['vimeo-embed.component.scss'],
})
export class VimeoEmbedComponent implements OnInit {
	@Input() vimeoIframe: any;

	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.vimeoIframe = this.sanitizer.bypassSecurityTrustHtml(this.vimeoIframe);
	}
}
