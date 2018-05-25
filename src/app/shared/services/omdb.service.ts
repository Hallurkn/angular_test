import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OMDBService {
	constructor(private _http: Http) { }

	getMovieData(id: string) {
		const url = 'http://www.omdbapi.com/?apikey=17634977&i=' + id;

		return this._http.get(url)
			.map((response: Response) => response.json());
	}
}
