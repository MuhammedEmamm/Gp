import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }
  FetchNews(Query: any, lang: any, type: any, source: any, country: any, category: any, sortby: any) {
    return this.http.get(endpoint('FetchNews') + Query + '&lang=' + lang + '&type=' + type + '&country=' + country + '&source=' + source + '&category=' + category + '&sort=' + sortby);
  }
  FetchSources() {
    return this.http.get('https://newsapi.org/v2/sources?apiKey=a96b258ae04044d79886855bb03003a1');
  }

}
